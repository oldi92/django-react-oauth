from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
import datetime

from integrations.services import GoogleCalendarService


class Events(APIView, GoogleCalendarService):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        calendar_service = self.build_calendar_service(request)
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        events_result = calendar_service.events().list(calendarId='primary', timeMin=now,
                                                       maxResults=5, singleEvents=True,
                                                       orderBy='startTime').execute()
        return Response(events_result)
