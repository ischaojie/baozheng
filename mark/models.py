from django.contrib.auth.models import User
from django.db import models


# Create your models here.


# DataSet
class DataSet(models.Model):
    # name
    name = models.CharField(max_length=50)
    # dataset info
    description = models.CharField(max_length=100, blank=True, null=True)
    # dataset origin db table
    origin = models.CharField(max_length=50)
    # create time
    create_at = models.DateTimeField()
    # is this dataset public? default is true
    opened = models.BooleanField(default=True)
    # is marked finish?
    finished = models.BooleanField(default=False)
    # dataset source file classify field
    classify_field = models.CharField(max_length=50)
    # dataset data source count
    count = models.IntegerField(blank=True, null=True)
    # marked percent
    mark_percent = models.FloatField(blank=True, null=True)

    # belong to which user, use django default user system
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'<dataset: {self.name}>'


# dataset classify
class Classify(models.Model):
    # datasource classify, for example: 0, 1, 2
    classify = models.IntegerField()
    # every classify name classify name
    name = models.CharField(max_length=20)
    # belong to which dataset table
    dataset = models.ForeignKey(DataSet, on_delete=models.CASCADE)

    def __str__(self):
        return f'<{self.dataset}_classify: {self.name}>'
