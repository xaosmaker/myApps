from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from core_apps.work_hours.models import WorkDay, WorkShift
from core_apps.work_hours.serializers import WorkDaySerializer, WorkShiftSerializer

# Create your views here.


class WorkShiftViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    pagination_class = None
    serializer_class = WorkShiftSerializer
    queryset = WorkShift.objects.all()

    def get_queryset(self):
        user = self.request.user
        return WorkShift.objects.filter(profile=user.profile)


class WorkDayViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    pagination_class = None
    serializer_class = WorkDaySerializer
    queryset = WorkDay.objects.all()

    def get_queryset(self):
        user = self.request.user
        return WorkDay.objects.filter(profile=user.profile)
