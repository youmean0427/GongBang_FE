from django.urls import path
from . import views

urlpatterns = [
    path('coffeecafes/', views.coffee_cafes)
]
