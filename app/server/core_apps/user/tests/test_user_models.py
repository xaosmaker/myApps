"""
Test the user models
"""

import pytest
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError

pytestmark = pytest.mark.django_db


def test_create_user_should_suceed(user):
    """Create user with email should succeed"""

    created_user = get_user_model().objects.create_user(**user)
    assert created_user.username == user["username"]
    assert created_user.email == user["email"]
    assert created_user.check_password(user["password"]) is True
    assert created_user.is_staff is False
    assert created_user.is_active is False
    assert created_user.is_superuser is False


def test_create_user_print_user_should_succeed(user):
    """Create a user and test str method should succeed"""
    created_user = get_user_model().objects.create_user(**user)
    assert str(created_user) == user["email"]


def test_create_user_without_email_should_fail(user):
    """Create user without email should raise ValueError"""
    user["email"] = ""

    with pytest.raises(ValueError) as e:
        get_user_model().objects.create_user(**user)
    assert str(e.value) == "An email address must be provided"


def test_create_user_without_username_should_fail(user):
    """Create user without username should raise ValueError"""
    user["username"] = ""
    with pytest.raises(ValueError) as e:
        get_user_model().objects.create_user(**user)
    assert str(e.value) == "A username must be provided"


def test_create_user_without_password_should_succeed(user):
    """Create user without password should create the user
    but it will be an unused user"""
    user["password"] = ""
    created_user = get_user_model().objects.create_user(**user)
    assert created_user.username == user["username"]
    assert created_user.email == user["email"]
    assert created_user.check_password(user["password"]) is True

    assert created_user.is_staff is False
    assert created_user.is_active is False
    assert created_user.is_superuser is False


@pytest.mark.parametrize(
    "email", ["xaos@testcom", "test.test.com", "test.com@", "test.test"]
)
def test_create_user_with_wrong_email_should_fail(email, user):
    """Create a user with wrong email should raise value ValueError"""
    user["email"] = email

    with pytest.raises(ValidationError) as e:
        get_user_model().objects.create_user(**user)
    assert str(e.value.message) == "Enter a valid email address"


@pytest.mark.parametrize(
    "email,expected",
    [
        ("tesT@Example.com", "tesT@example.com"),
        ("Test@Example.cOm", "Test@example.com"),
        ("teSt.tesT@ExamPle.COM", "teSt.tesT@example.com"),
        ("tesT@ExamplE.com", "tesT@example.com"),
    ],
)
def test_normalize_email_should_succeed(user, email, expected):
    """Create a user with email and check the email if normalize"""
    user["email"] = email
    created_user = get_user_model().objects.create_user(**user)
    assert created_user.email == expected


def test_create_user_with_existing_email_should_fail(user):
    """Create a 2nd user with the same email should fail user is unique"""
    get_user_model().objects.create_user(**user)
    user["username"] = "test2"
    with pytest.raises(IntegrityError) as e:
        get_user_model().objects.create_user(**user)
    msg = (str(e.value.args[0])).split("\n")
    assert len(msg) == 2
    assert "duplicate key value violates unique constraint" in msg[0]
    assert "(email)=(test@example.com) already exists" in msg[1]


def test_create_user_with_existing_username_should_fail(user):
    """Create a 2nd user with the same username should
    fail because username in unique"""

    get_user_model().objects.create_user(**user)
    user["email"] = "test2@example.com"
    with pytest.raises(IntegrityError) as e:
        get_user_model().objects.create_user(**user)
    msg = (str(e.value.args[0])).split("\n")
    assert len(msg) == 2
    assert "duplicate key value violates unique constraint" in msg[0]
    assert "(username)=(test) already exists" in msg[1]


def test_create_superuser_should_succeed(user):
    """Create a superuser should succeed"""
    created_user = get_user_model().objects.create_superuser(**user)
    assert created_user.username == user["username"]
    assert created_user.email == user["email"]
    assert created_user.check_password(user["password"]) is True
    assert created_user.is_staff is True
    assert created_user.is_active is True
    assert created_user.is_superuser is True


def test_create_superuser_without_is_staff_should_fail(user):
    """Create superuser without being a staff should fail"""
    user["is_staff"] = False
    with pytest.raises(ValueError) as e:
        get_user_model().objects.create_superuser(**user)
    assert str(e.value) == "Superuser must have is_staff=True."


def test_create_superuser_without_is_superuser_should_fail(user):
    """Create superuser without being a superuser should fail"""
    user["is_superuser"] = False
    with pytest.raises(ValueError) as e:
        get_user_model().objects.create_superuser(**user)
    assert str(e.value) == "Superuser must have is_superuser=True."


def test_create_superuser_without_is_active_should_fail(user):
    """Create superuser without being active should fail"""
    user["is_active"] = False
    with pytest.raises(ValueError) as e:
        get_user_model().objects.create_superuser(**user)
    assert str(e.value) == "Superuser must have is_active=True."
