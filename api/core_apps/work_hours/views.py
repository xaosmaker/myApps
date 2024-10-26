from django.shortcuts import render
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from core_apps.work_hours.models import WorkShift
from core_apps.work_hours.serializers import WorkShiftSerializer

# Create your views here.


class WorkShiftViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, GenericViewSet):
    pagination_class = None
    serializer_class = WorkShiftSerializer
    queryset = WorkShift.objects.all()

    def get_queryset(self):
        user = self.request.user
        return WorkShift.objects.filter(profile=user.profile)
