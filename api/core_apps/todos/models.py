import datetime

from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.profiles.models import Profile

# Create your models here.
# TODO: need test for todos and  todos admin
<<<<<<< HEAD


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

    # TODO: make a method who calculates if the doto is completed in time
    # TODO: make a method who calculates if the doto is completed at all

    def finish_model(self):
        print("run")
        print(datetime.datetime.now(tz=datetime.UTC) > self.complete_until)
        print(self.completed is False)
        print(self.expired is False)
        if self.completed is False and self.expired is False:
            print(datetime.datetime.now(tz=datetime.UTC) > self.complete_until)
            if datetime.datetime.now(tz=datetime.UTC) > self.complete_until:
                self.expired = True

            todos_bool = [i.is_completed for i in self.todo.all()]
            if todos_bool and all(todos_bool) is True:
                self.completed = True

            if self.expired is False and self.completed is True:
                self.completed_in_time = True

        self.save()

        pass


class TodoTasks(TimeStampedModel):
    name = models.CharField(max_length=50, verbose_name=_("Todo Name"))
    is_completed = models.BooleanField(default=False)
    todo_list = models.ForeignKey(
        Todo,
        on_delete=models.CASCADE,
        related_name="todo",
=======


class TodosList(TimeStampedModel):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    title = models.CharField(max_length=50, verbose_name=_("Todo List Title"))
    complete_until = models.DateTimeField(verbose_name=_("Todo Complete Time"))
    is_completed_in_time = models.BooleanField(
        default=False, verbose_name=_("Is Completed In Time")
    )
    is_completed = models.BooleanField(
        default=False,
        verbose_name=_("Is Completed"),
    )

    def __str__(self) -> str:
        return str(self.title)

    # TODO: make a method who calculates if the doto is completed in time
    # TODO: make a method who calculates if the doto is completed at all


class Todos(TimeStampedModel):
    name = models.CharField(max_length=50, verbose_name=_("Todo Name"))
    is_completed = models.BooleanField(default=False)
    todos_list = models.ForeignKey(
        TodosList,
        on_delete=models.CASCADE,
        related_name="todos",
>>>>>>> acc0c38 (chore: finish the models of todos and profiles)
    )

    def __str__(self) -> str:
        return self.name.__str__()

    class Meta:
        ordering = ["is_completed"]
