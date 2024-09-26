from rest_framework.viewsets import ModelViewSet

from core_apps.gym_tracker.models import GymDay, GymMachine, GymTracker
from core_apps.gym_tracker.serializers import (
    GymDaySerializer,
    GymMachineSerializer,
    GymTrackerSerializer,
)


class GymDayViewset(ModelViewSet):
    serializer_class = GymDaySerializer
    queryset = GymDay.objects.all()

    def get_queryset(self):
        user = self.request.user
        return GymDay.objects.filter(profile=user.profile)


class GymMachineViewset(ModelViewSet):
    pagination_class = None
    serializer_class = GymMachineSerializer
    queryset = GymMachine.objects.all()

    def get_queryset(self):
        return GymMachine.objects.all()


class GymTrackerViewSet(ModelViewSet):
    serializer_class = GymTrackerSerializer
    queryset = GymTracker.objects.all()

    def get_queryset(self):
        user = self.request.user
        return GymTracker.objects.filter(profile=user.profile)
