from django.contrib import admin

from core_apps.daily_diary.models import DiaryDate, DiaryNotes

# Register your models here.

admin.site.register(DiaryDate)
admin.site.register(DiaryNotes)
