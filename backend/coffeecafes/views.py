from django.shortcuts import render
from .models import CoffeeCafe, Review, ReviewImage
from rest_framework.decorators import api_view, permission_classes
from .serializers import CoffeeCafeSerializer, ReviewSerializer, ReviewImageSerializer, CoffeeCafeImageSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from django.db.models import Max

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


# Review Create, Update
def coffee_cafe_detail_review(request, id, type):
    if request.method == 'POST':
        review_cnt = Review.objects.aggregate(Max('id'))['id__max']
        
        data = request.POST.copy() 
        data['cafe'] = id
        if type == 0:
            data['id'] = review_cnt + 1
            serializer_coffeecafe_detail_reivew = ReviewSerializer(data=data)
        else:
            existing_review = Review.objects.filter(id=type).first()
            serializer_coffeecafe_detail_reivew = ReviewSerializer(existing_review, data=data, partial=True)

        images = request.FILES.getlist('image')
        if serializer_coffeecafe_detail_reivew.is_valid():
            review = serializer_coffeecafe_detail_reivew.save()
            for i, image in enumerate(images):
              
                 review_image_data = {'review' : review.id, 'image' : image}
                 serializer_review_image = ReviewImageSerializer(data=review_image_data)
                 if serializer_review_image.is_valid():
                    serializer_review_image.save()
        else:
            print(serializer_coffeecafe_detail_reivew.errors)
        return JsonResponse(serializer_coffeecafe_detail_reivew.data, safe=False)

# Review Delete
def review_delete(request, id):
    if request.method == 'DELETE':
        review = Review.objects.get(id=id)
        review.delete()
    return JsonResponse("Review Deleted", safe=False)


# Review Get
def review_get(request, id):
    review = Review.objects.get(id=id)
    if request.method == 'GET':
        serializer_review = ReviewSerializer(review)
        return JsonResponse(serializer_review.data, safe=False)

# Review Delete
def review_image_delete(request, id):
    if request.method == 'DELETE':
        review_image = ReviewImage.objects.get(id=id)
        review_image.delete()
    return JsonResponse("Review Image Deleted", safe=False)


# Coffeecafe Create
def coffee_cafe_create(request):
    if request.method == 'POST':
        coffee_cafe_cnt = CoffeeCafe.objects.aggregate(Max('id'))['id__max']


        data = request.POST.copy()
        data['id'] = coffee_cafe_cnt + 1
        serializer_coffeecafe = CoffeeCafeSerializer(data=data)
        images = request.FILES.getlist('image')
     

        if serializer_coffeecafe.is_valid():
            coffeecafe = serializer_coffeecafe.save()
            for i, image in enumerate(images):
                coffeecafe_images = {'cafe' : coffeecafe.id, 'image' : image}
                serializer_coffeecafe_image = CoffeeCafeImageSerializer(data = coffeecafe_images)
                if serializer_coffeecafe_image.is_valid():
                    serializer_coffeecafe_image.save()
        else:
            print(serializer_coffeecafe.errors)

    return JsonResponse(serializer_coffeecafe.data, safe=False)