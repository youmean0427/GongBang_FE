from django.db import models

# Create your models here.

class CoffeeCafe(models.Model):

    title = models.CharField(max_length=100)
    total_score = models.FloatField()
