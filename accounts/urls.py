# accounts/urls.py

from django.urls import path, include
from . import views


app_name = 'accounts'
urlpatterns = [
    path('signup', views.signup),
    path('account/<int:pk>', views.account),
    path('login', views.login),
    path('auth', include('rest_framework.urls', namespace='rest_framework'))

]