from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class WorkHoursConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.work_hours"
    verbose_name = _("Work Hours")
