from django.contrib.auth.models import User, Group
from rest_framework import serializers

from mark.models import DataSet


class UserSerializer(serializers.ModelSerializer):
    datasets = serializers.PrimaryKeyRelatedField(many=True, queryset=DataSet.objects.all())

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'datasets']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class DataSetSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = DataSet
        fields = ['id', 'name', 'description', 'origin', 'create_at', 'opened', 'count', 'mark_percent', 'owner']
