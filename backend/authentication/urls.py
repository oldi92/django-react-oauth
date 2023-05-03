from django.urls import path, include
from .views import GoogleLogin


urlpatterns = [
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('google-login/', GoogleLogin.as_view(), name='google-login'),
]
