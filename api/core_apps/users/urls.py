from django.urls import include, path

from core_apps.users.views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    LogoutAPIView,
)

urlpatterns = [
    path("", include("djoser.urls")),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("refresh/", CustomTokenRefreshView.as_view(), name="refresh"),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
]
