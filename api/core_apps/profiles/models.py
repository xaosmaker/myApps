from django.contrib.auth import get_user_model
from django.db import models

from core_apps.common.models import TimeStampedModel

User = get_user_model()

# TODO: need test for profile and profile admin


class Profile(TimeStampedModel):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
    )

    def __str__(self) -> str:
        return self.user.email
