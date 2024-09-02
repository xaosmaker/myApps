from datetime import datetime

import pytest
from django.conf import settings
from django.contrib.auth import get_user_model
from pytz import timezone

from core_apps.todos.models import Todo


@pytest.fixture
def login_user(user):
    user = get_user_model().objects.create_user(**user)
    return user


@pytest.fixture
def todo_data(login_user):

    return {
        "profile": login_user.profile,
        "title": "test todo",
        "complete_until": datetime.now(tz=timezone(settings.TIME_ZONE)),
    }


@pytest.fixture
def todo(todo_data):
    return Todo.objects.create(**todo_data)
