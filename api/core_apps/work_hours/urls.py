from rest_framework.routers import SimpleRouter

from core_apps.work_hours.views import WorkShiftViewSet

router = SimpleRouter()

router.register("work-shifts", WorkShiftViewSet)


urlpatterns = router.urls
