from django.urls import path, include
from .views import GoogleLogin
from dj_rest_auth.registration.views import (
    SocialAccountListView, SocialAccountDisconnectView
)


urlpatterns = [
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('socialaccounts/', SocialAccountListView.as_view()),
    path('socialaccounts/<int:pk>/disconnect/',
         SocialAccountDisconnectView.as_view()),
    path('google-login/', GoogleLogin.as_view(), name='google_login'),
]
