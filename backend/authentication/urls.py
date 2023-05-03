from django.contrib import admin
from django.urls import path, include
from .views import Home, GoogleLogin, Hello
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter


urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('accounts/', include('allauth.urls')),
    path('hello/', Hello.as_view(), name='hello'),
    path('google-login/', GoogleLogin.as_view(), name='google-login'),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
]
