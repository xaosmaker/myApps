from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.profiles.models import Profile

# Create your models here.


class GymDay(TimeStampedModel):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        verbose_name=_("Gym Profile"),
        related_name="gym_profile",
    )

    def __str__(self) -> str:
        return str(self.created_at.date())

    class Meta:
        ordering = ["-created_at"]


class GymMachine(TimeStampedModel):

    machine_name = models.CharField(max_length=50, unique=True)
    is_tracked_by_time = models.BooleanField(default=False)

    def __str__(self) -> str:
        return str(self.machine_name)


class GymTracker(TimeStampedModel):
    """General gym class when the gym machine is selected
    the front end should choose the corect fields"""

    gym_machine = models.ForeignKey(
        GymMachine, on_delete=models.CASCADE, related_name="gym_machine"
    )
    gym_day = models.ForeignKey(
        GymDay, on_delete=models.CASCADE, related_name="gym_day"
    )
    gym_sets = models.IntegerField(blank=True, null=True)
    gym_reps = models.IntegerField(blank=True, null=True)
    gym_weight = models.IntegerField(blank=True, null=True)
    gym_workout_time = models.FloatField(blank=True, null=True)
    gym_dificulty = models.FloatField(blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.gym_machine.machine_name} {self.gym_day.created_at.date()}"
