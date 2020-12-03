from os import name
from django.contrib import admin
from django.contrib.admin.sites import AdminSite
from .models import Choice, Question
# Register your models here.


# * 自定义polls应用后台站点
# * 然后在项目urls.py 指定路由: 'path('admin/', admin_site.urls)'
class PollsAdminSite(AdminSite):
    site_header = 'Polls Administration'
    site_title = 'Polls admin'
    index_title = '站点地图'


admin_site = PollsAdminSite(name='PollsAdmin')


# * InlineModel(ChoiceInline) 会嵌入到 QuestionAdmin 中
# * TabularInline表示放在一行显示
class ChoiceInline(admin.TabularInline):
    model = Choice
    # 表示显示3次
    extra = 3

# * QuestionAdmin
# * ModelAdmin 代表admin中的一个模型，也就是一块内容（比如author、polls）
# * 可以自定义
# * 然后需要将自定义的ModelAdmin注册到AdminSite中。
class QuestionAdmin(admin.ModelAdmin):
    # 在后台展示的时候显示的字段
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    # 后天展示添加以 pub_date 值的过滤展示部件
    list_filter = ['pub_date']
    # 在admin添加一个搜索部件
    search_fields = ['question_text']

    # 字段集合（后台编辑时会按该顺序排列）
    fieldsets = [
        (None, {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes':['collaps']})
    ]

    inlines = [ChoiceInline]

# * 注册QuestionAdmin到自定义的admin_site
admin_site.register(Question, QuestionAdmin)
