from time import sleep

from celery import shared_task
from django.conf import settings
from django.core import mail


@shared_task(name="test_email_every_24_hours")
def test_email_every_24_hours():

    mail.send_mail(
        subject="testEmail",
        message="some mesage 1/9/24 10:00 to prwto",
        recipient_list=["drosinakis.drosos1@gmail.com"],
        from_email=settings.DEFAULT_FROM_EMAIL,
    )
