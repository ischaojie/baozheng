import os

from django.conf import settings
from django.contrib.auth.models import User
from django.db import models


# Create your models here.
def dataset_file_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return f'datasets/{instance.owner}/{filename}'


# DataSet
class DataSet(models.Model):
    # name, dataset name should unique
    name = models.CharField(max_length=50, unique=True)
    # dataset info
    description = models.CharField(max_length=100, blank=True, null=True)
    # dataset origin db table
    origin = models.CharField(max_length=50, blank=True, null=True)
    # create time
    create_at = models.DateTimeField(auto_now_add=True)
    # is this dataset public? default is true
    opened = models.BooleanField(default=True)
    # is marked finish?
    finished = models.BooleanField(default=False)
    # dataset source file classify field, default is classify
    classify_field = models.CharField(max_length=50, default='classify')
    # dataset data source count
    count = models.IntegerField(blank=True, null=True)
    # marked percentage, default is 0
    mark_percent = models.FloatField(blank=True, null=True)

    # belong to which user, use django default user system
    owner = models.ForeignKey('auth.User', related_name='datasets', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'<dataset: {self.name}>'

    @property
    def dataset_file_path(self):
        return os.path.join(settings.DATASETS_DIR, self.dataset_file)


# dataset classify
class DataSetClassify(models.Model):
    # datasource classify, for example: 0, 1, 2
    classify = models.IntegerField()
    # every classify name classify name
    name = models.CharField(max_length=20)
    # belong to which dataset table
    dataset = models.ForeignKey(DataSet, related_name='classifies', on_delete=models.CASCADE)

    def __str__(self):
        return f'<{self.dataset}_classify: {self.name}>'
