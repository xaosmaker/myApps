from rest_framework.viewsets import ModelViewSet

from core_apps.todos.models import Todo
from core_apps.todos.serializers import TodoListSerializer


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
        print("total_pages", data["total_pages"])
        print("current_page", data["current_page"])
        return list_data
