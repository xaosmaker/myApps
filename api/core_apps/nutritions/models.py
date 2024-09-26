from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.profiles.models import Profile


class TargetKilograms(TimeStampedModel):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    daily_target_nutritions = models.IntegerField(
        verbose_name=_("Nutrition Target"),
    )
    current_weight = models.FloatField()

    def __str__(self) -> str:
        return f"Nutrition Target: {self.daily_target_nutritions}, weight: {self.current_weight}"


class NutritionDay(TimeStampedModel):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        verbose_name=_("Nutrition Profile"),
        related_name="nutritions_profile",
    )
    total_foods_calories = models.IntegerField(blank=True, null=True)

    def __str__(self) -> str:
        return str(self.created_at.date())


class Nutrition(TimeStampedModel):
    nutrition_day = models.ForeignKey(
        NutritionDay,
        on_delete=models.CASCADE,
        verbose_name=_("Nutrition Day"),
        related_name="nutrition_day",
    )
    eat_time = models.TimeField()
    total_calories = models.IntegerField(blank=True, null=True)
    quantity = models.IntegerField()
    food = models.ForeignKey("FoodData", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.quantity}, {self.food}"


class FoodData(TimeStampedModel):
    food = models.CharField(max_length=250, unique=True)
    quantity = models.CharField(max_length=250)
    callories = models.IntegerField()

    def __str__(self) -> str:
        return f"{self.food} {self.callories}cal per {self.quantity}"
