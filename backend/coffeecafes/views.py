from django.shortcuts import render
from .models import CoffeeCafe, Review
from rest_framework.decorators import api_view, permission_classes
from .serializers import CoffeeCafeSerializer, ReviewSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.shortcuts import get_object_or_404
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


def coffee_cafe_detail_review(request, id):
    if request.method == 'POST':
        coffecafe_detail = CoffeeCafe.objects.get(id = id)
        serializer_coffeecafe_detail = CoffeeCafeSerializer(coffecafe_detail)
        review_cnt = len(serializer_coffeecafe_detail.data['review_set'])
        
        data = request.POST.copy() 
        data['cafe'] = id
        data['id'] = review_cnt + 1

        serializer_coffeecafe_detail_reivew = ReviewSerializer(data=data)
        if serializer_coffeecafe_detail_reivew.is_valid():
            serializer_coffeecafe_detail_reivew.save()
  
        return JsonResponse(serializer_coffeecafe_detail_reivew.data, safe=False)