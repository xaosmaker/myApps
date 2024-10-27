from rest_framework.routers import SimpleRouter

from core_apps.work_hours.views import WorkDayViewSet, WorkShiftViewSet

router = SimpleRouter()

router.register("work-shifts", WorkShiftViewSet)
router.register("work-day", WorkDayViewSet)


urlpatterns = router.urls
