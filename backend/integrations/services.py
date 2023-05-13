from allauth.socialaccount.models import SocialApp
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build


class GoogleCalendarService():
    def get_google_social_app(self):
        social_app = SocialApp.objects.get(provider='google')
        return social_app

    def build_service(self, access_token, refresh_token):
        social_app = self.get_google_social_app()

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
