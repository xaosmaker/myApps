from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.profiles.models import Profile

# Create your models here.
# TODO: need test for todos and  todos admin


class Todo(TimeStampedModel):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    title = models.CharField(max_length=50, verbose_name=_("Todo List Title"))
    complete_until = models.DateTimeField(verbose_name=_("Todo Complete Time"))
    expired = models.BooleanField(default=False)
    completed_in_time = models.BooleanField(
        default=False, verbose_name=_("Is Completed In Time")
    )
    completed = models.BooleanField(
        default=False,
        verbose_name=_("Is Completed"),
    )

    def __str__(self) -> str:
        return str(self.title)

    # TODO: make a method who calculates if the doto is completed in time
    # TODO: make a method who calculates if the doto is completed at all


class TodoTasks(TimeStampedModel):
    name = models.CharField(max_length=50, verbose_name=_("Todo Name"))
    is_completed = models.BooleanField(default=False)
    todo = models.ForeignKey(
        Todo,
        on_delete=models.CASCADE,
        related_name="todo",
    )

    def __str__(self) -> str:
        return self.name.__str__()
