from django.db import models

# Create your models here.
class Account(models.Model):
    name  = models.CharField(max_length=10)
    login_id = models.CharField(max_length = 20)
    password = models.CharField(max_length = 20)
    email = models.EmailField()
    nickname = models.CharField(max_length= 10)
    created_at = models.DateTimeField(auto_now_add=True)