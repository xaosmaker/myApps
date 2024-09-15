from django.urls import path
from rest_framework.routers import SimpleRouter

from core_apps.daily_diary.views import (
    DiaryDateViewset,
    DiaryNotesChoicesView,
    DiaryNoteViewSet,
)

router = SimpleRouter()
router.register("daily-diary", DiaryDateViewset)
router.register("dialy-diary-notes", DiaryNoteViewSet)


urlpatterns = [
    path(
        "daily-diary/choices/",
        DiaryNotesChoicesView.as_view(),
        name="daily-diary/choices",
    )
]
urlpatterns += router.urls
