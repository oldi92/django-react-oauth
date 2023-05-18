from django.urls import path, include
from rest_framework import routers

from .views import CreateGoogleCalendarViewset

router = routers.DefaultRouter()
router.register(r"google-calendar", CreateGoogleCalendarViewset)


urlpatterns = [
    path('', include(router.urls)),
]
