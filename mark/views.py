from django.http.response import Http404
from django.shortcuts import render
from .models import Source
import random


# Create your views here.


def index(request):
    # * 从source 随机取一个
    # source = Source.objects.raw(
    #     'SELECT * FROM mark_source WHERE marked=false ORDER BY RANDOM() limit 1'
    # )
    # TODO 数据量大会有性能问题
    # source_list = [s.id for s in Source.objects.all().filter(marked=False)]
    # choice_source = random.choice(source_list)
    # source = Source.objects.get(pk=choice_source)

    # * 使用垃圾短信测试数据库
    # * 待优化
    source = Source.objects.raw(
        'SELECT * FROM mark_source WHERE marked=false ORDER BY RAND() limit 1'
    )
    context = {'source': source[0]}
    return render(request, 'mark/index.html', context)


def detail(request, source_id):
    try:
        source = Source.objects.get(pk=source_id)
    except Source.DoesNotExist:
        raise Http404("Source does not exist")
    return render(request, 'mark/detail.html', {'source': source})
