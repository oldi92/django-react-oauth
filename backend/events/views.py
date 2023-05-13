from allauth.socialaccount.models import SocialToken, SocialApp
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from rest_framework.response import Response
from rest_framework.views import APIView
import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from allauth.socialaccount.providers.base.mixins import OAuthLoginMixin
from allauth.socialaccount.providers.oauth2.views import OAuth2View
import requests


class Events(APIView):
    permission_classes = (IsAuthenticated,)

    def get_google_social_app(self):
        social_app = SocialApp.objects.get(provider='google')
        return social_app

    def get_social_token(self, user):
        try:
            social_token = SocialToken.objects.get(
                account__user=user, account__provider='google')
            return social_token
        except:
            social_token = None
            return social_token

    def build_service(self, social_token):
        social_app = self.get_google_social_app()

        print('TOKEN ', social_token.__dict__)

        credentials = Credentials(
            token=social_token.token,
            refresh_token=social_token.token_secret,
            token_uri='https://oauth2.googleapis.com/token',
            client_id=social_app.client_id,
            client_secret=social_app.secret,
            scopes=[
                'https://www.googleapis.com/auth/calendar.readonly'
            ]
        )

        service = build('calendar', 'v3', credentials=credentials)
        return service

    def get(self, request):

        social_token = self.get_social_token(request.user)

        if (social_token == None):
            return Response({"no_social_account": "User has no social account connected!"}, status.HTTP_400_BAD_REQUEST)

        service = self.build_service(social_token)
        now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
        events_result = service.events().list(calendarId='primary', timeMin=now,
                                              maxResults=5, singleEvents=True,
                                              orderBy='startTime').execute()
        return Response(events_result)


class SocialCalendar(APIView, OAuthLoginMixin, OAuth2View):
    def get_google_social_app(self):
        social_app = SocialApp.objects.get(provider='google')
        return social_app

    def build_service(self, token, refresh_token):
        social_app = self.get_google_social_app()

        credentials = Credentials(
            token,
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

    def post(self, request):
        code = request.data['code']
        token_url = "https://oauth2.googleapis.com/token"
        social_app = SocialApp.objects.get(provider='google')
        client_id = social_app.client_id
        client_secret = social_app.secret
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "http://localhost:3000/dashboard",
            "client_id": client_id,
            "client_secret": client_secret
        }
        response = requests.post(token_url, data)
        data = response.json()
        access_token = data['access_token']
        refresh_token = data['refresh_token']

        service = self.build_service(access_token, refresh_token)
        now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
        events_result = service.events().list(calendarId='primary', timeMin=now,
                                              maxResults=5, singleEvents=True,
                                              orderBy='startTime').execute()
        return Response(events_result)
