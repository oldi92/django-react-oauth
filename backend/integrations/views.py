from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import GoogleCalendar
from .serializers import GoogleCalendarSerializer
from authentication.services import GoogleOauth2


class CreateGoogleCalendarViewset(viewsets.ModelViewSet, GoogleOauth2):
    permission_classes = (IsAuthenticated, )
    queryset = GoogleCalendar.objects.all()
    serializer_class = GoogleCalendarSerializer

    def create(self, request):
        authorization_code = request.data['code']
        token = self.fetch_token(authorization_code)
        access_token = token['access_token']
        refresh_token = token['refresh_token']

        data = {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": request.user.pk
        }

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["GET"], url_path='get-by-user')
    def get_by_user(self, request):
        user_pk = self.request.query_params.get("user")
        google_calendar = get_object_or_404(GoogleCalendar, user__pk=user_pk)
        serializer = self.serializer_class(google_calendar)

        return Response(serializer.data)
