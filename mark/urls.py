from django.urls import path

from . import views

app_name = 'mark'

urlpatterns = [

    path('', views.index, name='index'),

    # datasets
    path(r'datasets/', views.DataSetList.as_view()),
    path(r'datasets/<int:pk>/', views.DataSetDetail.as_view()),
    path(r'datasets/<int:pk>/mark/', views.DataSetMark.as_view()),

    # dataset's classifies
    path(r'datasets/<int:pk>/classifies/', views.DataSetClassifyList.as_view(), name='dataset-classifies-list'),
    # upload dataset
    path(r'datasets/upload/', views.DataSetUploadView.as_view()),

    # users
    path(r'users/', views.UserList.as_view()),
    path(r'users/<int:pk>/', views.UserDetail.as_view()),
]
