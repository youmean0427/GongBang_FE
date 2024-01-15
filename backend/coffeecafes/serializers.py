from rest_framework import serializers
from .models import CoffeeCafe, Review, ReviewImage, CoffeeCafeImage


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    reviewimage_set = ReviewImageSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = '__all__'

class CoffeeCafeImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeCafeImage
        fields = '__all__'

class CoffeeCafeSerializer(serializers.ModelSerializer):
    review_set = ReviewSerializer(many=True, read_only=True)
    coffeecafeimage_set = CoffeeCafeImageSerializer(many=True, read_only=True)
    class Meta:
        model = CoffeeCafe
        fields = '__all__'

