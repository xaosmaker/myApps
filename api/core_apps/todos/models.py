import datetime

from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.profiles.models import Profile

# Create your models here.
# TODO: need test for todos admin


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

    class Meta:
        ordering = ["completed", "expired", "complete_until"]

    def finish_model(self):
        if self.completed is False and self.expired is False:
            if datetime.datetime.now(tz=datetime.UTC) > self.complete_until:
                self.expired = True

            todo_tasks_bools = [i.is_completed for i in self.todo.all()]
            if todo_tasks_bools and all(todo_tasks_bools) is True:
                self.completed = True

            if self.expired is False and self.completed is True:
                self.completed_in_time = True

        self.save()


class TodoTasks(TimeStampedModel):
    name = models.CharField(max_length=255, verbose_name=_("Todo Name"))
    is_completed = models.BooleanField(default=False)
    todo_list = models.ForeignKey(
        Todo,
        on_delete=models.CASCADE,
        related_name="todo",
    )

    def __str__(self) -> str:
        return self.name.__str__()

    class Meta:
        ordering = ["is_completed"]
