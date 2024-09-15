from os import getenv

from config.settings.base import *
from config.settings.production import EMAIL_BACKEND  # noqa

SECRET_KEY = getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-3^!ww-c$0z8=zh*l(_7zls4u27jdic+gb=jws83!e*gfeqel&s",
)

DEBUG = True

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "192.168.1.102",
    "192.168.1.101",
    "192.168.1.5",
    "192.168.1.127",
]
CSRF_TRUSTED_ORIGINS = ["http://0.0.0.0:8080", "http://localhost:8080"]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(name)-12s %(asctime)s %(module)s %(process)d %(thread)d %(message)s",
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        }
    },
    "root": {
        "lever": "INFO",
        "handlers": ["console"],
    },
}

# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_BACKEND = "djcelery_email.backends.CeleryEmailBackend"
EMAIL_HOST = getenv("EMAIL_HOST")
EMAIL_USE_TLS = getenv("EMAIL_USE_TLS")
EMAIL_PORT = getenv("EMAIL_PORT")
EMAIL_HOST_USER = getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = getenv("EMAIL_HOST_PASSWORD")
