from rest_framework.routers import SimpleRouter

from core_apps.nutritions.views import (
    FoodDataViewset,
    NutritionDateViewset,
    NutritionViewSet,
)

router = SimpleRouter()
router.register("nutritions", NutritionViewSet)
router.register("food-data", FoodDataViewset)
router.register("nutritions-list", NutritionDateViewset)
urlpatterns = router.urls
