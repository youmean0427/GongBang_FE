from django.shortcuts import render
from .models import CoffeeCafe
from rest_framework.decorators import api_view
from .serializers import CoffeeCafeSerializer
from rest_framework.response import Response
# Create your views here.
@api_view(['GET'])
def coffee_cafes(request):
    coffeecafes = CoffeeCafe.objects.all()
    serializer_coffeecafes = CoffeeCafeSerializer(coffeecafes, many = True)
    return Response(serializer_coffeecafes.data)