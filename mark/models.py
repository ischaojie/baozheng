from django.db import models
from django.contrib.auth.models import User


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
    # dataset data source count
    count = models.IntegerField(blank=True, null=True)
    # marked percent
    mark_percent = models.FloatField(blank=True, null=True)
    # classify(two classify or another)
    # classification = models.CharField()

    # belong to which user, use django default user system
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'<dataset: {self.name}>'
