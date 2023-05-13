from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import GoogleCalendar
from .serializers import GoogleCalendarSerializer


class CreateGoogleCalendarViewset(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = GoogleCalendar.objects.all()
    serializer_class = GoogleCalendarSerializer

    @action(detail=False, methods=["GET"])
    def get_by_user(self, request):

        return Response("GET BY USER")
