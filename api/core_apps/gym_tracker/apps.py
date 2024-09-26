from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class GymTrackerConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.gym_tracker"
    verbose_name = _("Gym Tracker")
