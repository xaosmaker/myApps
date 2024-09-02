from datetime import datetime, timedelta

import pytest
from django.conf import settings
from django.db import IntegrityError
from pytz import timezone

from core_apps.todos.models import Todo, TodoTasks

pytestmark = pytest.mark.django_db


def test_create_todo_succeed(login_user):
    date = datetime.now(tz=timezone(settings.TIME_ZONE))
    todo = Todo.objects.create(
        profile=login_user.profile, title="test_todo", complete_until=date
    )
    todo_object = Todo.objects.filter(title="test_todo").exists()
    assert todo_object is True
    assert todo.profile == login_user.profile
    assert todo.title == "test_todo"
    assert str(todo) == "test_todo"
    assert todo.complete_until == date
    assert todo.expired is False
    assert todo.completed is False
    assert todo.completed_in_time is False


def test_create_todo_without_user_should_fail():
    date = datetime.now(tz=timezone(settings.TIME_ZONE))
    with pytest.raises(IntegrityError) as e:
        Todo.objects.create(title="test_todo", complete_until=date)
    assert (
        'null value in column "profile_id" of relation "todos_todo" violates not-null constraint'
        in str(e.value)
    )


def test_create_todo_without_completed_until_should_fail(login_user):
    with pytest.raises(IntegrityError) as e:
        Todo.objects.create(profile=login_user.profile, title="test_todo")
    assert (
        'null value in column "complete_until" of relation "todos_todo" violates not-null constraint'
        in str(e.value)
    )


def test_todo_expire_should_succed(todo_data):
    """create a todo with old datatime and
    check if the finish method set it to expired should succeed"""
    todo_data["complete_until"] -= timedelta(hours=1)
    todo = Todo.objects.create(**todo_data)
    todo.finish_model()
    assert todo.expired is True
    assert todo.completed_in_time is False
    assert todo.completed is False


def test_todo_completed_should_fail(todo_data):
    """a todo can't be completed without any task,
    if a todo have any task can be completed"""
    todo_data["complete_until"] += timedelta(hours=1)
    todo = Todo.objects.create(**todo_data)
    todo.finish_model()
    assert todo.expired is False
    assert todo.completed_in_time is False
    assert todo.completed is False


def test_todo_with_finished_todo_task_should_succeed(todo_data):
    """Test the todo with a finished todo task and
    remaining time so should succeed"""

    todo_data["complete_until"] += timedelta(hours=1)
    todo = Todo.objects.create(**todo_data)
    TodoTasks.objects.create(name="todo task", is_completed=True, todo_list=todo)

    todo.finish_model()
    assert todo.expired is False
    assert todo.completed_in_time is True
    assert todo.completed is True


def test_todo_with_unfinished_todo_should_fail(todo_data):

    todo_data["complete_until"] += timedelta(hours=1)
    todo = Todo.objects.create(**todo_data)
    TodoTasks.objects.create(name="todo task", is_completed=False, todo_list=todo)

    todo.finish_model()
    assert todo.expired is False
    assert todo.completed_in_time is False
    assert todo.completed is False


def test_create_todo_task_should_succeed(todo):
    todo_task = TodoTasks.objects.create(todo_list=todo, name="test")
    todo_task_object = TodoTasks.objects.filter(name="test").exists()
    assert todo_task_object is True
    assert todo_task.todo_list == todo
    assert todo_task.name == "test"
    assert todo_task.is_completed is False
    assert str(todo_task) == "test"


# TODO: this should raise a validation error but not know i look it lates
def test_create_todo_task_without_name_should_fail(todo):
    TodoTasks.objects.create(todo_list=todo)


def test_create_todo_task_without_todo_list_should_fail(todo):
    with pytest.raises(IntegrityError) as e:

        TodoTasks.objects.create(name="test")
    assert (
        'null value in column "todo_list_id" of relation "todos_todotasks" violates not-null constraint'
        in str(e.value)
    )
