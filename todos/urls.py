from django.urls import path
from .views import TaskListCreateView, TaskDeleteView

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDeleteView.as_view(), name='task-delete'),
]