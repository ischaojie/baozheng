from django.contrib import admin

from mark.models import DataSet


# Register your models here.


class DatasetAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'create_at', 'owner', 'opened', 'count', 'mark_percent')

    search_fields = ['name']


admin.site.register(DataSet, DatasetAdmin)
