from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class DayliDiaryConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.daily_diary"
    verbose_name = _("Daily Diary")
