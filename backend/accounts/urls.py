# accounts/urls.py

from django.urls import path, include
from . import views

app_name = 'accounts'
urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration/', include('dj_rest_auth.registration.urls'))
]