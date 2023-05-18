from rest_framework import serializers

from .models import GoogleCalendar


class GoogleCalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleCalendar
        fields = "__all__"
