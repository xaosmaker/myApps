import logging

from django.conf import settings
from django.db.models.signals import post_save

from core_apps.profiles.models import Profile

logger = logging.getLogger(__name__)


def create_profile_automaticaly(sender, instance, created, **kwargs):
    if created:

        Profile.objects.create(user=instance)
        logger.info(f"Profile successfully created for {instance.email} {instance.id}")
    else:
        logger.info(f"Profile already exist for {instance.email} {instance.id}")


post_save.connect(
    create_profile_automaticaly,
    sender=settings.AUTH_USER_MODEL,
)
