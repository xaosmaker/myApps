from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from core_apps.users.models import User


class UserAdmin(BaseUserAdmin):
    list_display = (
        "email",
        "id",
        "username",
        "is_active",
        "is_superuser",
        "created_at",
    )
    readonly_fields = ("created_at", "edited_at", "last_login")
    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_superuser",
                    "is_staff",
                    "is_active",
                    "user_permissions",
                )
            },
        ),
        ("dates", {"fields": ("created_at", "edited_at", "last_login")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ["wide"],
                "fields": (
                    "email",
                    "username",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "password1",
                    "password2",
                ),
            },
        ),
    )


admin.site.register(User, UserAdmin)
