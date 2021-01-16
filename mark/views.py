from django.forms import model_to_dict
from django.http.response import Http404, HttpResponseRedirect, JsonResponse
from django.shortcuts import render

from .forms import SourceJudgeForm
from .models import Source, Origin
from .utils import IJsonResponse
import random


# Create your views here.

# 语料库列表
def index(request):
    origins = Origin.objects.all()

    for origin in origins:
        all_source = Source.objects.filter(origin_id=origin.id).count()
        completed = Source.objects.filter(origin_id=origin.id, marked=True).count()
        origin.percentage = f'{completed / all_source:.2}'

    context = {'origins': origins}
    return IJsonResponse('success', context)


# 语料库评判
def judge(request, origin_id):
    # * 从source 随机取一个
    # source = SourceJudge.objects.raw(
    #     'SELECT * FROM mark_source WHERE marked=false ORDER BY RANDOM() limit 1'
    # )
    # TODO 数据量大会有性能问题
    # source_list = [s.id for s in SourceJudge.objects.all().filter(marked=False)]
    # choice_source = random.choice(source_list)
    # source = SourceJudge.objects.get(pk=choice_source)

    # * 使用测试数据库
    # * 待优化
    source = Source.objects.raw(
        'SELECT * FROM mark_source WHERE marked=false AND origin_id=%s ORDER BY RAND() limit 1',
        [origin_id]
    )[0]

    if request.method == 'POST':
        category = request.POST.get('category', '')
        # update this source
        source.objects.update(category=category)
        # redirect
        return HttpResponseRedirect('mark/judge/')

    elif request.method == 'GET':
        context = {'source': source}
        return IJsonResponse('success', context)


def detail(request, origin_id, source_id):
    try:
        source = Source.objects.get(pk=source_id, origin=origin_id)
    except Source.DoesNotExist:
        return IJsonResponse('error', {'title': 'this source does not exist'})
    return IJsonResponse('success', {'source': source})
