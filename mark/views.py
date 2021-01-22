import os

from django.conf import settings
from django.contrib.auth.models import User
from django.db import connections, DatabaseError
from django.db.models import Q
from django.http.response import Http404, HttpResponseRedirect
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DataSet
from .permissions import IsOwnerOrReadOnly
from .serializers import UserSerializer, DataSetSerializer, DataSetClassifySerializer
from .utils import IJsonResponse, parser_dataset_file


# Create your views here.

# dataset list
def index(request):
    datasets = DataSet.objects.all().filter(opened=True)

    context = {'origins': datasets}
    return IJsonResponse('success', context)


# dataset mark
def mark(request, dataset_id):
    # * 从source 随机取一个
    # source = DatasetMark.objects.raw(
    #     'SELECT * FROM mark_source WHERE marked=false ORDER BY RANDOM() limit 1'
    # )
    # TODO 数据量大会有性能问题
    # source_list = [s.id for s in DatasetMark.objects.all().filter(marked=False)]
    # choice_source = random.choice(source_list)
    # source = DatasetMark.objects.get(pk=choice_source)

    # fetch random source data from dataset origin database table
    # get this dataset's origin db name
    dataset = DataSet.objects.get(pk=dataset_id)
    origin_name = dataset.origin

    # select from origin db
    with connections['datasets'].cursor() as cursor:
        # TODO only not marked source need to
        cursor.execute(f"select * from {origin_name} order by RAND() limit 1")
        columns = [col[0] for col in cursor.description]
        source = [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]

    if request.method == 'POST':
        category = request.POST.get('category', '')
        # update this source
        source.objects.update(category=category)
        # redirect
        return HttpResponseRedirect('datasets/')

    elif request.method == 'GET':
        context = {'source': source[0]}
        return IJsonResponse('success', context)


def detail(request, dataset_id):
    """
    get a dataset detail
    :param request:
    :param dataset_id:
    :return:
    """
    try:
        dataset = DataSet.objects.get(dataset_id)
    except DataSet.DoesNotExist:
        return IJsonResponse('error', {'title': 'this dataset does not exist'})
    return IJsonResponse('success', {'dataset': dataset})


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class DataSetList(APIView):
    """
    list all opened dataset, and opened or private dataset only for owner
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get(self, request):
        # only owner can see self public and private dataset and another public,
        # otherwise only public dataset
        if request.user.id:
            datasets = DataSet.objects.all().filter(
                Q(owner=request.user) | (~Q(owner=request.user) & Q(opened=True))

            )
        else:
            datasets = DataSet.objects.all().filter(opened=True)

        serializer = DataSetSerializer(datasets, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DataSetSerializer(data=request.data)
        classify_serializer = DataSetClassifySerializer(data=request.data.classify)
        filename = request.data.filename

        if serializer.is_valid() and classify_serializer.is_valid():
            serializer.save()
            # create dataset source table
            parser_dataset_file(filepath, f'{serializer.owner}_{serializer.origin}')
            # todo 更新 count, 如果数据已经包含标注的，需要指定分类字段，

            if serializer.classify_field:
                # if serializer.classify_field !=
                classify_field = serializer.classify_field

            # 如果是新的 dataset，创建 classify 字段，初始化为 null
            with connections['datasets'].cursor() as cursor:
                cursor.execute(f'alter table {serializer.origin} add {serializer.classify_field} int')

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        """only dataset owner user can create"""
        serializer.save(owner=self.request.user)


class DataSetDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_dataset_object(self, pk, owner):
        """
        only dataset owner can edit, can get all opened dataset and self
        opened dataset for everyone
        """
        try:
            dataset = DataSet.objects.get(pk=pk)
        except DataSet.DoesNotExist:
            raise Http404

        if dataset.owner != owner and not dataset.opened:
            raise PermissionDenied(detail='no permission', code=403)

        return dataset

    def get(self, request, pk):
        """user can only get self all and another public dataset"""
        dataset = self.get_dataset_object(pk, request.user)
        serializer = DataSetSerializer(dataset)
        return Response(serializer.data)

    def put(self, request, pk):
        dataset = self.get_dataset_object(pk, request.user)
        serializer = DataSetSerializer(dataset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        dataset = self.get_dataset_object(pk, request.user)
        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DataSetMark(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_dataset_object(self, pk, owner):
        """
        only dataset owner can edit, can get all opened dataset and self
        opened dataset for everyone
        """
        try:
            dataset = DataSet.objects.get(pk=pk)
        except DataSet.DoesNotExist:
            raise Http404

        if dataset.owner != owner and not dataset.opened:
            raise PermissionDenied(detail='no permission', code=403)

        return dataset

    def get_dataset_origin_random(self, request, pk):
        dataset = self.get_dataset_object(pk, owner=request.user)
        print(dataset)

        with connections['datasets'].cursor() as cursor:
            # TODO only not marked source need to
            try:
                cursor.execute(f"select * from {dataset.origin} order by RAND() limit 1")
            except DatabaseError:
                raise

            columns = [col[0] for col in cursor.description]
            source = [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]
            return source[0]

    def get(self, request, pk):
        random_source = self.get_dataset_origin_random(request, pk)
        return Response(data=random_source)

    def put(self, request, pk):
        # todo 标注完成的 dataset，不可以编辑了！
        dataset = self.get_dataset_object(request, pk)
        data = request.data
        with connections['datasets'].cursor() as cursor:
            cursor.execute(f"update {dataset.origin} set classify={data.classify}")
            columns = [col[0] for col in cursor.description]
            source = [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]
            return Response(source[0])

        return Response("error", status=status.HTTP_400_BAD_REQUEST)


class DataSetUploadView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    parser_classes = (FileUploadParser,)

    def post(self, request):
        up_file = request.FILES['file']
        datasets_dir = settings.DATASETS_DIR

        if not os.path.exists(datasets_dir):
            os.system(f'mkdir {datasets_dir}')

        filepath = os.path.join(datasets_dir, f'{request.user}_{up_file.name}')
        with open(filepath, 'wb+') as destination:
            for chunk in up_file.chunks():
                destination.write(chunk)

        # ...
        # do some stuff with uploaded file
        # ...
        return Response(up_file.name, status.HTTP_201_CREATED)
