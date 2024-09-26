from rest_framework.viewsets import ModelViewSet

from core_apps.nutrition_tracker.models import (
    FoodData,
    Nutrition,
    NutritionDay,
    TargetKilograms,
)
from core_apps.nutrition_tracker.serializers import (
    FoodDataSerializer,
    NutritionDaySerializer,
    NutritionSerializer,
    TargetKilogramsSerializer,
)


class NutritionViewSet(ModelViewSet):
    serializer_class = NutritionSerializer
    queryset = Nutrition.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Nutrition.objects.filter(nutrition_day__profile=user.profile)


class FoodDataViewset(ModelViewSet):
    pagination_class = None
    serializer_class = FoodDataSerializer
    queryset = FoodData.objects.all()


class NutritionDateViewset(ModelViewSet):
    serializer_class = NutritionDaySerializer
    queryset = NutritionDay.objects.all()

    def get_queryset(self):
        user = self.request.user
        return NutritionDay.objects.filter(profile=user.profile)


class TargetKilogramsViewSet(ModelViewSet):
    pagination_class = None
    serializer_class = TargetKilogramsSerializer
    queryset = TargetKilograms.objects.all()

    def get_queryset(self):
        user = self.request.user
        return TargetKilograms.objects.filter(profile=user.profile)
