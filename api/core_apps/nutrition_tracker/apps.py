from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class NutritionsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.nutrition_tracker"
    verbose_name = _("Nutrition Tracker")
