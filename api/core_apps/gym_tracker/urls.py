from rest_framework.routers import SimpleRouter

from core_apps.gym_tracker.views import (
    GymDayViewset,
    GymMachineViewset,
    GymTrackerViewSet,
)

router = SimpleRouter()

router.register("gym-list", GymDayViewset)
router.register("gym-machine", GymMachineViewset)
router.register("gym-tracker", GymTrackerViewSet)

urlpatterns = router.urls
