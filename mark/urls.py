from . import views
from django.urls import path, include
from rest_framework import routers

app_name = 'mark'

urlpatterns = [

    path('', views.index, name='index'),
    path('datasets/<int:pk>/', views.DataSetList.as_view()),
    path('datasets/<int:pk>/mark/', views.DataSetMark.as_view()),

    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
]
