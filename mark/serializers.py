from django.contrib.auth.models import User, Group
from rest_framework import serializers

from mark.models import DataSet, DataSetClassify


class UserSerializer(serializers.ModelSerializer):
    datasets = serializers.PrimaryKeyRelatedField(many=True, queryset=DataSet.objects.all())

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email', 'datasets']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class DataSetClassifySerializer(serializers.ModelSerializer):
    class Meta:
        model = DataSetClassify
        fields = ['name', 'classify']


class DataSetSerializer(serializers.ModelSerializer):
    classifies_url = serializers.HyperlinkedIdentityField(read_only=True,
                                                          view_name='datasets:dataset-classifies-list')

    # read only field, this read only mean's just return value from model
    owner = serializers.ReadOnlyField(source='owner.username')
    origin = serializers.CharField(required=False)

    class Meta:
        model = DataSet
        fields = ['id', 'name', 'description', 'create_at',
                  'origin', 'opened', 'finished', 'classify_field', 'classifies_url',
                  'count', 'mark_percent',
                  'owner']

    # def create(self, validated_data):
    #     classifies_data = validated_data.pop('classifies')
    #     dataset = DataSet.objects.create(**validated_data)
    #     for classify_data in classifies_data:
    #         DataSetClassify.objects.create(dataset=dataset, **classify_data)
    #     return dataset

    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
