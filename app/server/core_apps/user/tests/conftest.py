import pytest


@pytest.fixture
def user():
    return {
        "username": "test",
        "email": "test@example.com",
        "password": "test123",
    }
