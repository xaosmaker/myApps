from rest_framework.routers import SimpleRouter

from core_apps.nutrition_tracker.views import (
    FoodDataViewset,
    NutritionDateViewset,
    NutritionViewSet,
    TargetKilogramsViewSet,
)

router = SimpleRouter()
router.register("nutritions", NutritionViewSet)
router.register("food-data", FoodDataViewset)
router.register("nutritions-list", NutritionDateViewset)
router.register("user-weight", TargetKilogramsViewSet)
urlpatterns = router.urls
