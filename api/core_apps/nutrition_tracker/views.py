from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet

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


class NutritionViewSet(ListModelMixin, GenericViewSet):
    serializer_class = NutritionSerializer
    queryset = Nutrition.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Nutrition.objects.filter(nutrition_day__profile=user.profile)


class FoodDataViewset(CreateModelMixin, ListModelMixin, GenericViewSet):
    pagination_class = None
    serializer_class = FoodDataSerializer
    queryset = FoodData.objects.all()


class NutritionDateViewset(ListModelMixin, GenericViewSet):
    serializer_class = NutritionDaySerializer
    queryset = NutritionDay.objects.all()

    def get_queryset(self):
        user = self.request.user
        return NutritionDay.objects.filter(profile=user.profile)


class TargetKilogramsViewSet(ListModelMixin, CreateModelMixin, GenericViewSet):
    pagination_class = None
    serializer_class = TargetKilogramsSerializer
    queryset = TargetKilograms.objects.all()

    def get_queryset(self):
        user = self.request.user
        return TargetKilograms.objects.filter(profile=user.profile)
