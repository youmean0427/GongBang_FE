from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

class CoffeeCafe(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, default="")
    address = models.CharField(max_length=100)
    time = models.CharField(max_length=100)
    total_score = models.FloatField()
    lat = models.FloatField(default=0)
    lng = models.FloatField(default=0)
    vibe = models.FloatField(default=0)
    seat = models.FloatField(default=0)
    coffee = models.FloatField(default=0)
    plug = models.FloatField(default=0)
    wifi = models.FloatField(default=0)
    toilet = models.FloatField(default=0)
    parking = models.FloatField(default=0)
    note = models.FloatField(default=0) # 비고

class CoffeeCafeImage(models.Model):
    cafe = models.ForeignKey(CoffeeCafe, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', null=True, blank = True)


class Review(models.Model):
    id = models.IntegerField(primary_key=True)
    cafe = models.ForeignKey(CoffeeCafe, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField(max_length=500)
    date = models.DateField()
    score = models.FloatField()
    type = models.IntegerField()
    name = models.TextField(max_length=10)
    

class ReviewImage(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', null=True, blank = True)