from rest_framework import response, status
from rest_framework.mixins import DestroyModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from core_apps.todos.models import Todo, TodoTasks
from core_apps.todos.serializers import TodoListSerializer, TodoSerializer

# TODO: need test for api calls


class TodosViewSet(ModelViewSet):
    serializer_class = TodoListSerializer
    queryset = Todo.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(profile__user=user)

    def list(self, request, *args, **kwargs):
        """Return the data for the statistics"""
        list_data = super().list(request, *args, **kwargs)
        queryset = self.get_queryset()
        all_completed_todo = queryset.filter(completed=True).count()
        all_failed_todo = queryset.filter(expired=True).count()
        all_pending_todo = queryset.filter(
            expired=False, completed=False, completed_in_time=False
        ).count()
        data = list_data.data
        data["all_completed_todo"] = all_completed_todo
        data["all_failed_todo"] = all_failed_todo
        data["all_pending_todo"] = all_pending_todo
        return list_data


class TodoTaskDelete(DestroyModelMixin, GenericViewSet):
    serializer_class = TodoSerializer
    queryset = TodoTasks.objects.all()

    def get_queryset(self):
        user = self.request.user
        data = TodoTasks.objects.filter(todo_list__profile__user=user)
        return data

    def destroy(self, request, *args, **kwargs):
        if kwargs["pk"]:
            todo_task = self.get_queryset().get(pkid=kwargs["pk"])
            todo = Todo.objects.get(todo=todo_task)

        if todo.expired is True or todo.completed is True:
            return response.Response(
                status=status.HTTP_403_FORBIDDEN,
                data={"detail": "Can't delete a completed of expired todo task."},
            )

        return super().destroy(request, *args, **kwargs)
