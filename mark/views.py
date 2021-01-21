from django.db import connections
from django.forms import model_to_dict
from django.http.response import Http404, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics, status
from rest_framework import permissions
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.views import APIView

from .forms import SourceJudgeForm
from .models import DataSet
from .serializers import UserSerializer, GroupSerializer, DataSetSerializer
from .utils import IJsonResponse
import random


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
    def get(self, request):
        datasets = DataSet.objects.all()
        serializer = DataSetSerializer(datasets, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DataSetSerializer(data=request.data)
        pass


class DataSetDetail(APIView):

    def get_dataset_object(self, pk):
        try:
            return DataSet.objects.get(pk=pk)
        except DataSet.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        dataset = self.get_dataset_object(pk)
        serializer = DataSetSerializer(dataset)
        return Response(serializer.data)

    def delete(self, request, pk):
        dataset = self.get_dataset_object(pk)
        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DataSetMark(APIView):

    def get_dataset_object(self, pk):
        try:
            DataSet.objects.get(pk=pk)
        except DataSet.DoesNotExist:
            raise Http404

    def get_dataset_origin_random(self, pk):
        dataset = self.get_dataset_object(pk)

        try:
            with connections['datasets'].cursor() as cursor:
                # TODO only not marked source need to
                cursor.execute(f"select * from {dataset.origin} order by RAND() limit 1")
                columns = [col[0] for col in cursor.description]
                source = [
                    dict(zip(columns, row))
                    for row in cursor.fetchall()
                ]
                return source[0]
        except APIException:
            raise Http404

    def get(self, request, pk):
        random_source = self.get_dataset_origin_random(pk)
        return Response(data=random_source)

    def put(self, request, pk):
        dataset = self.get_dataset_object(pk)
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
