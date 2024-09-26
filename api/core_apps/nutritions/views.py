from rest_framework.viewsets import ModelViewSet

from core_apps.nutritions.models import FoodData, Nutrition, NutritionDay
from core_apps.nutritions.serializers import (
    FoodDataSerializer,
    NutritionDaySerializer,
    NutritionSerializer,
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
