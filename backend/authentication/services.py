from allauth.socialaccount.models import SocialApp
import requests


class GoogleOauth2():
    token_url = "https://oauth2.googleapis.com/token"
    grant_type = "authorization_code"
    redirect_uri = "http://localhost:3000/dashboard"

    def fetch_token(self, code):
        social_app = SocialApp.objects.get(provider='google')
        client_id = social_app.client_id
        client_secret = social_app.secret

        data = {
            "grant_type": self.grant_type,
            "code": code,
            "redirect_uri": self.redirect_uri,
            "client_id": client_id,
            "client_secret": client_secret
        }
        response = requests.post(self.token_url, data)
        return response.json()
