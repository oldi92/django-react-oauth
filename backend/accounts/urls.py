from django.urls import path, include

urlpatterns = [
    path('', include('allauth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
]
