from mark.models import Source
from django.contrib import admin

# Register your models here.


class SourceAdmin(admin.ModelAdmin):
    list_display = ('head', 'detail', 'category', 'is_mark')
    search_fields = ['head']


admin.site.register(Source, SourceAdmin)
