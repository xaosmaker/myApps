"""
Base user model.
"""

import uuid

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.users.managers import UserManager

# TODO: need test for the last_name and first name and admin user


class User(AbstractBaseUser, PermissionsMixin):
    """
    Base user class
    """

    pkid = models.BigAutoField(primary_key=True, unique=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    username = models.CharField(verbose_name=_("Username"), unique=True, max_length=50)
    email = models.EmailField(
        verbose_name=_("Email Address"), unique=True, max_length=200, db_index=True
    )
    first_name = models.CharField(verbose_name=_("First name"), max_length=60)
    last_name = models.CharField(verbose_name=_("Last name"), max_length=60)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username", "first_name", "last_name"]

    objects = UserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return str(self.email)
