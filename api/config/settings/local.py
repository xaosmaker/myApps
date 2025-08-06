from os import getenv, path

from config.settings.base import *  # noqa
from config.settings.base import BASE_DIR

ALLOWED_HOSTS = ["myapps"]

CSRF_TRUSTED_ORIGINS = ["https://myapps"]

SECRET_KEY = getenv(
    "DJANGO_SECRET_KEY",
)

ADMINS = [
    ("Drosinakis Drosos", "apptestmailprovider@gmail.com"),
]

# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_BACKEND = "djcelery_email.backends.CeleryEmailBackend"
EMAIL_HOST = getenv("EMAIL_HOST")
EMAIL_USE_TLS = getenv("EMAIL_USE_TLS")
EMAIL_PORT = getenv("EMAIL_PORT")
EMAIL_HOST_USER = getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = getenv("EMAIL_HOST_PASSWORD")

DOMAIN = getenv("DOMAIN")
SITE_NAME = getenv("SITE_NAME")

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = 300

SECURE_HSTS_INCLUDE_SUBDOMAINS = (
    getenv("DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS", "True") == "True"
)

SECURE_HSTS_PRELOAD = getenv("DJANGO_SECURE_HSTS_PRELOAD", "True") == "True"

SECURE_CONTENT_TYPE_NOSNIFF = (
    getenv("DJANGO_SECURE_CONTENT_TYPE_NOSNIFF", "True") == "True"
)
DEBUG = True


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {"require_debug_false": {"()": "django.utils.log.RequireDebugFalse"}},
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(name)-12s %(asctime)s %(module)s %(process)d %(thread)d %(message)s",
        }
    },
    "handlers": {
        "mail_admins": {
            "level": "ERROR",
            "filters": ["require_debug_false"],
            "class": "django.utils.log.AdminEmailHandler",
        },
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {
        "lever": "INFO",
        "handlers": ["console"],
        "loggers": {
            "django.request": {
                "handlers": ["mail_admins"],
                "level": "ERROR",
                "propagate": True,
            },
            "django.security.DisallowedHost": {
                "handlers": ["console", "mail_admins"],
                "level": "ERROR",
                "propagate": True,
            },
        },
    },
}
