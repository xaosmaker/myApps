from django.contrib import admin

from core_apps.todos.models import Todo, TodoTasks

# Register your models here.


@admin.register(TodoTasks)
class TodosAdmin(admin.ModelAdmin):
    list_display = ("name", "todo", "is_completed", "id")


@admin.register(Todo)
class TodosAdminList(admin.ModelAdmin):
    list_display = (
        "title",
        "complete_until",
        "completed",
        "completed_in_time",
        "expired",
        "id",
    )
