from django.urls import path

from . import views

app_name = 'mark'

urlpatterns = [

    path('', views.index, name='index'),
    path('datasets/', views.DataSetList.as_view()),
    path('datasets/<int:pk>/', views.DataSetDetail.as_view()),
    path('datasets/<int:pk>/mark/', views.DataSetMark.as_view()),
    # upload dataset
    path('datasets/upload/', views.DataSetUploadView.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
]
