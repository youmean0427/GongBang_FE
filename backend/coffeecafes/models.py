from django.db import models
# Create your models here.

class CoffeeCafe(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, default="")
    address = models.CharField(max_length=100)
    time = models.CharField(max_length=100)
    total_score = models.FloatField()
    lat = models.FloatField()
    lng = models.FloatField()
    image = models.ImageField(upload_to='images/', null=True, blank = True)


class Review(models.Model):
    id = models.IntegerField(primary_key=True)
    cafe = models.ForeignKey(CoffeeCafe, on_delete=models.CASCADE)
    user = models.TextField(max_length = 10 )
    title = models.CharField(max_length=50)
    content = models.TextField(max_length=500)
    date = models.DateField()
    score = models.FloatField()
    type = models.IntegerField()
    image = models.ImageField(upload_to='images/', null=True, blank = True)