from django.contrib.auth.models import User, Group
from rest_framework import serializers

from mark.models import DataSet, Classify


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
    classify = serializers.PrimaryKeyRelatedField(many=True, queryset=Classify.objects.all())

    # read only field
    owner = serializers.ReadOnlyField(source='owner.username')
    origin = serializers.ReadOnlyField()
    create_at = serializers.ReadOnlyField()

    class Meta:
        model = DataSet
        fields = ['id', 'name', 'description', 'create_at',
                  'origin', 'opened', 'finished', 'classify_field',
                  'count', 'mark_percent',
                  'owner']

    # def update(self, instance, validated_data):
    #     instance.opened = validated_data.get('opened', instance.opened)
    #     instance.save()
    #     return instance


class DataSetClassifySerializer(serializers.ModelSerializer):
    dataset = serializers.ReadOnlyField(source='dataset.name')

    class Meta:
        model = Classify
        fields = ['id', 'name', 'classify', 'dataset']
