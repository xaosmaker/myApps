from django.db import models

from core_apps.common.models import TimeStampedModel
from core_apps.profiles.models import Profile

# Create your models here.


class WorkShift(TimeStampedModel):
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="work_shift_profile"
    )
    company = models.CharField(max_length=100)
    start_of_shift = models.TimeField()
    end_of_shift = models.TimeField()

    def __str__(self) -> str:
        return f"{self.company} {self.start_of_shift}-{self.end_of_shift}"

    class Meta:
        ordering = ["-created_at"]


class WorkDay(TimeStampedModel):
    class WorkDayType(models.TextChoices):
        TRAVEL = "Travel"
        NORMAL_DAY = "Work Day"
        WEEKEND = "Weekend"
        TIMES_OFF = "Times off"
        SICK_LEAVE = "Sick Leave"
        PUBLIC_HOLIDAY = "Public Holiday"

    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="work_day_profile"
    )
    work_day_shift = models.ForeignKey(
        WorkShift, on_delete=models.CASCADE, null=True, blank=True
    )
    type_of_work_day = models.CharField(max_length=50, choices=WorkDayType.choices)
    date = models.DateField(unique=True)
    location = models.CharField(max_length=150, null=True, blank=True)
    start_of_work = models.TimeField(null=True, blank=True)
    end_of_work = models.TimeField(null=True, blank=True)
    comment = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self) -> str:
        return f"{self.date}, {self.start_of_work}-{self.end_of_work}"
