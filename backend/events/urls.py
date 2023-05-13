from django.contrib import admin
from django.urls import path, include
from .views import Events, SocialCalendar

urlpatterns = [
    path('', Events.as_view(), name='events'),
    path('social-calendar/', SocialCalendar.as_view(), name='social_calendar'),
]
