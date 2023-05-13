from django.urls import path
from .views import Events

urlpatterns = [
    path('', Events.as_view(), name='events'),
]
