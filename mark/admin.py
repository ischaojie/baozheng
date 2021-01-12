from mark.models import Source, Origin
from django.contrib import admin


# Register your models here.


class SourceAdmin(admin.ModelAdmin):
    list_display = ('head', 'detail', 'category', 'marked', 'origin_name')

    search_fields = ['head']


class OriginAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')


admin.site.register(Source, SourceAdmin)
admin.site.register(Origin, OriginAdmin)
