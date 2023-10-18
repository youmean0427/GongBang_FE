from rest_framework import serializers
from .models import CoffeeCafe


# Queryset과 Model Instance 같은 것을 쉽게 JSON, XML로 변환

class CoffeeCafeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeCafe  # 모델 사용
        fields = '__all__'  # 모든 필드