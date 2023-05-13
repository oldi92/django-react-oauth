from dj_rest_auth.registration.views import SocialLoginView, SocialConnectView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client, OAuth2Error
import jwt


class CustomGoogleOAuth2Adapter(GoogleOAuth2Adapter):
    '''
    Custom google Oauth2 adapter because there is a open issue on dj-rest-auth
    which trying to grab id_token from response but response is dictionary

    More info
    https://github.com/iMerica/dj-rest-auth/issues/490
    '''

    def complete_login(self, request, app, token, response, **kwargs):
        try:
            print('********** ')
            print('LOGOIN ', response["id_token"])
            print('********** ')
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
        except jwt.PyJWTError as e:
            raise OAuth2Error("Invalid id_token") from e
        login = self.get_provider().sociallogin_from_response(request, identity_data)
        return login


class GoogleLogin(SocialLoginView):
    adapter_class = CustomGoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = 'http://localhost:3000'


class GoogleConnect(SocialConnectView):
    adapter_class = CustomGoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = 'http://localhost:3000'
