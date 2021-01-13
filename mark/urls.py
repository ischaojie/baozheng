from . import views
from django.urls import path

app_name = 'mark'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:origin_id>/', views.judge, name='judge'),
    path('<int:origin_id>/sources/<int:source_id>/', views.detail, name='detail')
]
