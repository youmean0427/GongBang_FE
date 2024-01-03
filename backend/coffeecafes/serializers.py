from rest_framework import serializers
from .models import CoffeeCafe, Review, ReviewImage


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    reviewimage_set = ReviewImageSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = '__all__'

class CoffeeCafeSerializer(serializers.ModelSerializer):
    review_set = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = CoffeeCafe
        fields = '__all__'
