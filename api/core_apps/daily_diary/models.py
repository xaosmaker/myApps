from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.profiles.models import Profile

# Create your models here.


class DiaryDate(TimeStampedModel):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        verbose_name=_("Diary Date"),
        related_name="diary_profile",
    )
    date = models.DateField()

    def __str__(self) -> str:
        return str(self.date)

    class Meta:
        ordering = ["-date"]


class DiaryNotes(TimeStampedModel):
    class DiaryCroices(models.TextChoices):
        DIARY = ("diary", "Diary")
        NUTRITION = ("nutrition", "Nutrition")
        GYM = ("gym", "Gym")
        FEELINGS = ("feelings", "Feelings")

    diary_date = models.ForeignKey(
        DiaryDate,
        on_delete=models.CASCADE,
        verbose_name=_("Diary Note"),
        related_name="diary_date",
    )
    note_type = models.CharField(
        max_length=25, choices=DiaryCroices, default=DiaryCroices.DIARY
    )
    time = models.TimeField()
    note = models.TextField()

    @property
    def show_10_words_text(self) -> str:
        """return  the first 10 words of the text field"""
        return " ".join(self.note.split(" ")[0:11]) + " ....."

    def __str__(self) -> str:
        return f"{self.time} {self.show_10_words_text}"

    class Meta:
        ordering = ["-note_type", "time"]
