from django.urls import path
from rest_framework import routers

from core_apps.todos.views import TodosViewSet, TodoTaskDelete

router = routers.SimpleRouter()
router.register("todos", TodosViewSet)
router.register("todo-tasks", TodoTaskDelete)

urlpatterns = router.urls
