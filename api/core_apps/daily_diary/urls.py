from django.urls import path
from rest_framework.routers import SimpleRouter

from core_apps.daily_diary.views import DiaryDateViewset, DiaryNotesChoicesView

router = SimpleRouter()
router.register("daily-diary", DiaryDateViewset)


urlpatterns = [
    path(
        "daily-diary/choices/",
        DiaryNotesChoicesView.as_view(),
        name="daily-diary/choices",
    )
]
urlpatterns += router.urls
