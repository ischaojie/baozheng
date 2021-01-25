import tempfile

from django.contrib.auth.models import User
from django.db import connections, DatabaseError
from django.db.models import Q
from django.http.response import Http404
from rest_framework import generics, status
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DataSet, DataSetClassify
from .permissions import IsOwnerOrReadOnly
from .serializers import UserSerializer, DataSetSerializer, DataSetClassifySerializer
from .utils import parser_dataset_file, OverwriteStorage


# Create your views here.

# dataset list
def index(request):
    pass


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

        serializer = DataSetSerializer(datasets, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = DataSetSerializer(data=request.data, context={'request': request}, )

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        serializer = DataSetSerializer(dataset, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        dataset = self.get_dataset_object(pk, request.user)
        serializer = DataSetSerializer(dataset, data=request.data, context={'request': request})
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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    parser_classes = (FileUploadParser,)

    def post(self, request, pk):
        dataset = DataSet.objects.get(pk=pk)
        up_file = request.FILES['file']

        # save upload file
        dbname = f'{request.user}_{dataset.name}'
        filename = f'datasets_{dbname}.{up_file.name.split(".")[-1]}'

        # todo: for bigger file may be have performance problem
        if up_file:
            with tempfile.TemporaryFile() as temp:
                lines = up_file.readlines()
                temp.writelines(lines[4:-2])
                temp.seek(0)
                OverwriteStorage().save(filename, temp)

        # save to database
        # todo error handle
        parser_dataset_file(filename, dbname)
        with connections['datasets'].cursor() as cursor:
            cursor.execute(f'select count(id) from {dbname}')
            dataset.count = cursor.fetchone()[0]

        dataset.origin = dbname
        dataset.save()

        return Response(up_file.name, status.HTTP_201_CREATED)


class DataSetClassifyList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_dataset_classifies_object(self, pk, owner):
        """
        only dataset owner can edit, can get all opened dataset and self
        opened dataset for everyone
        """
        try:
            dataset = DataSet.objects.get(pk=pk)
            classifies = DataSetClassify.objects.all().filter(dataset=dataset)
        except DataSet.DoesNotExist:
            raise Http404
        except DataSetClassify.DoesNotExist:
            raise Http404

        if dataset.owner != owner and not dataset.opened:
            raise PermissionDenied(detail='no permission', code=403)

        return classifies

    def get(self, request, pk):
        """get all this dataset's classify"""
        classifies = self.get_dataset_classifies_object(pk, request.user)
        serializer = DataSetClassifySerializer(classifies, many=True)
        return Response(serializer.data)
