from rest_framework import routers

from core_apps.todos.views import TodosViewSet

router = routers.SimpleRouter()
router.register("todos", TodosViewSet)

urlpatterns = router.urls
