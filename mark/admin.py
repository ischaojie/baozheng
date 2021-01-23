from django.contrib import admin

from mark.models import DataSet, DataSetClassify


# Register your models here.
class DataSetClassifiesInline(admin.TabularInline):
    model = DataSetClassify
    # show 3 times
    extra = 3


class DatasetAdmin(admin.ModelAdmin):
    list_display = (
        'name', 'id', 'description', 'create_at', 'owner', 'opened', 'classify_field', 'count', 'mark_percent')

    search_fields = ['name']

    inlines = [DataSetClassifiesInline]


class DataSetClassifiesAdmin(admin.ModelAdmin):
    list_display = ('name', 'classify', 'dataset')


admin.site.register(DataSet, DatasetAdmin)
admin.site.register(DataSetClassify, DataSetClassifiesAdmin)
