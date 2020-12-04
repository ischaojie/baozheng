from mark.models import Source
from django.contrib import admin

# Register your models here.


class SourceAdmin(admin.ModelAdmin):
    list_display = ('head', 'detail', 'category', 'marked')
    search_fields = ['head']


admin.site.register(Source, SourceAdmin)
