from allauth.socialaccount.models import SocialToken, SocialApp, SocialAccount, SocialLogin
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from rest_framework.response import Response
from rest_framework.views import APIView
import datetime
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from accounts.models import CustomUser
from allauth.socialaccount.providers.base.mixins import OAuthLoginMixin
from allauth.socialaccount.providers.oauth2.views import OAuth2View
from django.http import HttpResponseRedirect
from allauth.socialaccount.providers.google.views import oauth2_login, oauth2_callback

from dj_rest_auth.registration.views import SocialLoginView, SocialConnectView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client, OAuth2Error
import jwt


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

# class OAuth2LoginView(OAuthLoginMixin, OAuth2View):
#     def login(self, request, *args, **kwargs):
        # provider = self.adapter.get_provider()
        # app = provider.get_app(self.request)
        # client = self.get_client(request, app)
        # action = request.GET.get("action", AuthAction.AUTHENTICATE)
        # auth_url = self.adapter.authorize_url
        # auth_params = provider.get_auth_params(request, action)

        # pkce_params = provider.get_pkce_params()
        # code_verifier = pkce_params.pop("code_verifier", None)
        # auth_params.update(pkce_params)
        # if code_verifier:
        #     request.session["pkce_code_verifier"] = code_verifier

        # client.state = SocialLogin.stash_state(request)
        # try:
        #     return HttpResponseRedirect(client.get_redirect_url(auth_url, auth_params))
        # except OAuth2Error as e:
        #     return render_authentication_error(request, provider.id, exception=e)


class CustomGoogleOAuth2Adapter(GoogleOAuth2Adapter):
    '''
    Custom google Oauth2 adapter because there is a open issue on dj-rest-auth
    which trying to grab id_token from response but response is dictionary

    More info
    https://github.com/iMerica/dj-rest-auth/issues/490
    '''

    def complete_login(self, request, app, token, response, **kwargs):
        try:

            identity_data = jwt.decode(
                response["id_token"]['id_token'],
                # Since the token was received by direct communication
                # protected by TLS between this library and Google, we
                # are allowed to skip checking the token signature
                # according to the OpenID Connect Core 1.0
                # specification.
                # https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation
                options={
                    "verify_signature": False,
                    "verify_iss": True,
                    "verify_aud": True,
                    "verify_exp": True,
                },
                issuer=self.id_token_issuer,
                audience=app.client_id,
            )

            print('********** ')
            print('CREATE CALENDAR ', identity_data)
            print('********** ')
        except jwt.PyJWTError as e:
            raise OAuth2Error("Invalid id_token") from e
        login = self.get_provider().sociallogin_from_response(request, identity_data)
        return login


class SocialCalendar(SocialLoginView):
    adapter_class = CustomGoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = 'http://localhost:3000'


# class SocialCalendar(APIView, OAuthLoginMixin, OAuth2View):
#     def post(self, request):
#         login = oauth2_login(request)
#         callback = oauth2_callback(request)
#         # code = request.data['code']
#         # provider = self.adapter.get_provider()
#         # app = provider.get_app(self.request)
#         # client = self.get_client(request, app)
#         # action = request.GET.get("action", AuthAction.AUTHENTICATE)
#         # auth_url = self.adapter.authorize_url
#         # auth_params = provider.get_auth_params(request, action)

#         # pkce_params = provider.get_pkce_params()
#         # code_verifier = pkce_params.pop("code_verifier", None)
#         # auth_params.update(pkce_params)
#         # if code_verifier:
#         #     request.session["pkce_code_verifier"] = code_verifier

#         # client.state = SocialLogin.stash_state(request)
#         # response = HttpResponseRedirect(
#         #     client.get_redirect_url(auth_url, auth_params))
#         # except OAuth2Error as e:
#         #     return render_authentication_error(request, provider.id, exception=e)

#         # SocialLogin.stash_state(request)
#         print('***************')
#         print("RESPONSE ", login)
#         print("CALLBACK ", callback)
#         print('***************')

#         return Response('Calendar created')
