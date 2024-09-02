import pytest


@pytest.fixture
def user():
    return {
        "username": "test",
        "email": "test@example.com",
        "password": "test123",
        "first_name": "First Name",
        "last_name": "last_name",
    }
