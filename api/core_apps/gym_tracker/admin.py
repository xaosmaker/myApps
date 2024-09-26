from django.contrib import admin

from core_apps.gym_tracker.models import GymDay, GymMachine, GymTracker

# Register your models here.

admin.site.register(GymMachine)
admin.site.register(GymTracker)
admin.site.register(GymDay)
