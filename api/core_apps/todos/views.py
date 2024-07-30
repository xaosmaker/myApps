from rest_framework.viewsets import ModelViewSet

from core_apps.todos.models import Todo
from core_apps.todos.serializers import TodoListSerializer

# Create your views here.


class TodosViewSet(ModelViewSet):
    serializer_class = TodoListSerializer
    queryset = Todo.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(profile__user=user)
