from django.contrib import admin

from core_apps.nutrition_tracker.models import (
    FoodData,
    Nutrition,
    NutritionDay,
    TargetKilograms,
)

# Register your models here.

admin.site.register(NutritionDay)
admin.site.register(Nutrition)
admin.site.register(FoodData)
admin.site.register(TargetKilograms)
