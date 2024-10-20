from django.db import models
from django.utils.translation import gettext_lazy as _

from core_apps.common.models import TimeStampedModel
from core_apps.profiles.models import Profile


class TargetKilograms(TimeStampedModel):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    daily_target_calories = models.IntegerField(
        verbose_name=_("Calories Target"),
    )
    current_weight = models.FloatField()

    def __str__(self) -> str:
        return f"Calories Target: {self.daily_target_calories}, weight: {self.current_weight}"

    class Meta:
        ordering = ["-created_at"]


class NutritionDay(TimeStampedModel):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        verbose_name=_("Nutrition Profile"),
        related_name="nutritions_profile",
    )
    total_foods_calories = models.FloatField(blank=True, null=True)

    def __str__(self) -> str:
        return str(self.created_at.date())

    class Meta:
        ordering = ["-created_at"]


class Nutrition(TimeStampedModel):
    nutrition_day = models.ForeignKey(
        NutritionDay,
        on_delete=models.CASCADE,
        verbose_name=_("Nutrition Day"),
        related_name="nutrition_day",
    )
    eat_time = models.TimeField()
    total_calories = models.FloatField(blank=True, default=0)
    quantity = models.FloatField()
    food = models.ForeignKey("FoodData", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.quantity}, {self.food}"


class FoodData(TimeStampedModel):
    food_name = models.CharField(max_length=250, unique=True)
    food_quantity = models.CharField(max_length=250)
    food_calories = models.IntegerField()

    def __str__(self) -> str:
        return f"{self.food_name} {self.food_calories}cal per {self.food_quantity}"
