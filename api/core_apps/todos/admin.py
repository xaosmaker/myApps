from django.contrib import admin

<<<<<<< HEAD
from core_apps.todos.models import Todo, TodoTasks
=======
from core_apps.todos.models import Todos, TodosList
>>>>>>> acc0c38 (chore: finish the models of todos and profiles)

# Register your models here.


<<<<<<< HEAD
@admin.register(TodoTasks)
class TodosAdmin(admin.ModelAdmin):
    list_display = ("name", "todo", "is_completed", "id")


<<<<<<< HEAD
@admin.register(Todo)
=======
@admin.register(Todos)
class TodosAdmin(admin.ModelAdmin):
    list_display = ("name", "todos_list", "is_completed", "id")


@admin.register(TodosList)
>>>>>>> acc0c38 (chore: finish the models of todos and profiles)
=======
@admin.register(TodoTasks)
class TodosAdmin(admin.ModelAdmin):
    list_display = ("name", "is_completed", "id")


@admin.register(Todo)
>>>>>>> 8958f9b (make the full funcionality of the todo)
class TodosAdminList(admin.ModelAdmin):
    list_display = (
        "title",
        "complete_until",
<<<<<<< HEAD
        "completed",
        "completed_in_time",
        "expired",
=======
        "is_completed",
        "is_completed_in_time",
>>>>>>> acc0c38 (chore: finish the models of todos and profiles)
        "id",
    )
