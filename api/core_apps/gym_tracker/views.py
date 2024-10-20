from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet

from core_apps.gym_tracker.models import GymDay, GymMachine, GymTracker
from core_apps.gym_tracker.serializers import (
    GymDaySerializer,
    GymMachineSerializer,
    GymTrackerSerializer,
)


class GymDayViewset(ListModelMixin, GenericViewSet):
    serializer_class = GymDaySerializer
    queryset = GymDay.objects.all()

    def get_queryset(self):
        user = self.request.user
        return GymDay.objects.filter(profile=user.profile)


class GymMachineViewset(ListModelMixin, CreateModelMixin, GenericViewSet):
    pagination_class = None
    serializer_class = GymMachineSerializer
    queryset = GymMachine.objects.all()

    def get_queryset(self):
        return GymMachine.objects.all()


class GymTrackerViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = GymTrackerSerializer
    queryset = GymTracker.objects.all()

    def get_queryset(self):
        user = self.request.user
        return GymTracker.objects.filter(profile=user.profile)
