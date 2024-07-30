from rest_framework.serializers import ModelSerializer

from core_apps.todos.models import Todo, TodoTasks


class TodoSerializer(ModelSerializer):
    class Meta:
        model = TodoTasks
        fields = ["pkid", "name", "todo", "is_completed"]
        read_only_fields = ["pkid"]


class TodoListSerializer(ModelSerializer):
    todo_tasks = TodoSerializer(many=True, source="todo")

    class Meta:
        model = Todo
        fields = [
            "pkid",
            "title",
            "complete_until",
            "expired",
            "completed",
            "completed_in_time",
            "todo_tasks",
        ]
        read_only_fields = [
            "completed_in_time",
            "pkid",
            "completed",
            "expired",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        print(validated_data)
        todo_tasks = validated_data.pop("todo", None)
        print(todo_tasks)

        instance = Todo.objects.create(profile=user.profile, **validated_data)
        return instance
