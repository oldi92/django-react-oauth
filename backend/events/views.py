from django.shortcuts import render
from django.http import HttpResponse
from allauth.socialaccount.models import SocialToken, SocialApp
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import datetime


def event(request):
    user = request.user
    social_token = SocialToken.objects.get(
        account__user=user, account__provider='google')
    access_token = social_token.token
    social_app = SocialApp.objects.get(provider='google')

    # Use the access token to create credentials
    # credentials = Credentials.from_authorized_user_info(
    #     info=social_token)
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
    now = datetime.datetime.utcnow().isoformat() + 'Z'  # 'Z' indicates UTC time
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                          maxResults=5, singleEvents=True,
                                          orderBy='startTime').execute()

    print('*******************')
    print('USER', user)
    print('SOCIAL TOKEN: ', social_token.token_secret)
    print('CREDENTIALS : ', credentials)
    print('SERVICE : ', service)
    print('EVENTS : ', events_result)
    print('*******************')
    return HttpResponse(f'Current user: {user.username}, This is event view')
