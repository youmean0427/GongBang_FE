from rest_framework import serializers
from .models import CoffeeCafe, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CoffeeCafeSerializer(serializers.ModelSerializer):
    review_set = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = CoffeeCafe
        fields = '__all__'