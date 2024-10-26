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
