from django.shortcuts import render
from .models import Source
# Create your views here.


def index(request):
    # 从source 随机取一个
    sources = Source.objects.raw(
        'SELECT * FROM mark_source WHERE is_mark=false ORDER BY RANDOM() limit 1'
    )
    context = {'sources': sources}
    return render(request, 'mark/index.html', context)


def detail(request, source_id):
    try:
        source = Source.objects.get(pk=source_id)
    except Source.DoesNotExist:
        raise Http404("Source does not exist")
    return render(request, 'mark/detail.html', {'source': source})
