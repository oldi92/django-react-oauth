from django.db import models
from django.conf import settings


class GoogleCalendar(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    access_token = models.TextField(
        blank=True,
        verbose_name="Access token",
    )
    refresh_token = models.TextField(
        blank=True,
        verbose_name="Refresh token",
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
