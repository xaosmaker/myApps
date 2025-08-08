from datetime import timedelta

from rest_framework.serializers import ModelSerializer

from core_apps.todos.models import Todo, TodoTasks


class TodoSerializer(ModelSerializer):
    class Meta:
        model = TodoTasks
        fields = ["pkid", "name", "is_completed"]
        read_only_fields = ["pkid"]

    def update(self, instance, validated_data):
        todo_instance: Todo = instance.todo_list
        if todo_instance.completed or todo_instance.expired:
            return instance

        data: TodoTasks = super().update(instance, validated_data)
        data.todo_list.finish_model()
        return data


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
        validated_data.pop("todo", None)
        validated_data["complete_until"] += timedelta(hours=23, seconds=59, minutes=59)

        instance = Todo.objects.create(profile=user.profile, **validated_data)
        return instance

    def update(self, instance, validated_data):
        todo_tasks = validated_data.pop("todo", None)
        for todo in todo_tasks:
            try:
                todo_task = TodoTasks.objects.get(
                    todo_list=instance,
                    name=todo["name"],
                )

            except TodoTasks.DoesNotExist:
                pass
                todo_task = TodoTasks.objects.create(
                    todo_list=instance, name=todo["name"]
                )

            todo_task.is_completed = todo["is_completed"]
            todo_task.save()

        instance.finish_model()
        return instance
