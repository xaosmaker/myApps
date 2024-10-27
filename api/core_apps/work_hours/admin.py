from django.contrib import admin

from core_apps.work_hours.models import WorkDay, WorkShift

# Register your models here.


admin.site.register(WorkShift)
admin.site.register(WorkDay)
