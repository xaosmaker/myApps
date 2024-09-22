from datetime import datetime

from celery import shared_task
from django.conf import settings
from django.core import mail
from pytz import timezone

from core_apps.todos.models import Todo


@shared_task(name="expiration_todo_reminder")
def expiration_todo_reminder():
    today = datetime.now(tz=timezone(settings.TIME_ZONE))

    all_penging_tasks = Todo.objects.filter(expired=False, completed=False)
    today_pending_tasks = []
    for i in all_penging_tasks:
        if i.complete_until.date() == today.date():
            today_pending_tasks.append(i)

    for i in today_pending_tasks:
        mail.send_mail(
            subject=f"Todo Title: {i.title.capitalize()} Expires Today",
            message=f"{i.title.capitalize()} Todo expires in {i.complete_until.astimezone(tz=timezone(settings.TIME_ZONE)).strftime("%d/%m/%Y %H:%M")} \n please finish it",
            recipient_list=[i.profile.user.email],
            from_email=settings.DEFAULT_FROM_EMAIL,
        )
