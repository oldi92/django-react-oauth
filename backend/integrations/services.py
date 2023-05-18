from allauth.socialaccount.models import SocialApp
from google.oauth2.credentials import Credentials
from allauth.socialaccount.models import SocialToken, SocialApp
from googleapiclient.discovery import build
from django.shortcuts import get_object_or_404

from .models import GoogleCalendar


class GoogleCalendarService():
    def get_social_token(self, user):
        try:
            social_token = SocialToken.objects.get(
                account__user=user, account__provider='google')
            return social_token
        except:
            return None

    def get_google_social_app(self):
        social_app = SocialApp.objects.get(provider='google')
        return social_app

    def build_calendar_service(self, request):
        user = request.user
        social_app = self.get_google_social_app()
        social_token = self.get_social_token(request.user)

        if (social_token == None):
            google_calendar = get_object_or_404(GoogleCalendar, user=user)
            access_token = google_calendar.access_token
            refresh_token = google_calendar.refresh_token
        else:
            access_token = social_token.token
            refresh_token = social_token.token_secret

        credentials = Credentials(
            token=access_token,
            refresh_token=refresh_token,
            token_uri='https://oauth2.googleapis.com/token',
            client_id=social_app.client_id,
            client_secret=social_app.secret,
            scopes=[
                'https://www.googleapis.com/auth/calendar'
            ]
        )
        service = build('calendar', 'v3', credentials=credentials)

        return service
