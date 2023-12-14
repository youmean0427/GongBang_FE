from django.shortcuts import render
from .models import CoffeeCafe, Review
from rest_framework.decorators import api_view, permission_classes
from .serializers import CoffeeCafeSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
# Create your views here.
# @api_view(['GET'])
# @permission_classes([AllowAny])
def coffee_cafes(request):
    coffeecafes = CoffeeCafe.objects.all()
    if request.method == 'GET':
        serializer_coffeecafes = CoffeeCafeSerializer(coffeecafes, many = True)
        return JsonResponse(serializer_coffeecafes.data, safe=False)

def coffee_cafe_detail(request, id):
    coffecafe_detail = CoffeeCafe.objects.get(id = id)
    if request.method == 'GET':
        serializer_coffeecafe_detail = CoffeeCafeSerializer(coffecafe_detail)
        return JsonResponse(serializer_coffeecafe_detail.data, safe=False)


