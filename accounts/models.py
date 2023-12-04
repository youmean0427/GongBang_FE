from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

class User(AbstractUser):
    username = models.CharField(max_length=10, unique=True)
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'username' 
    REQUIRED_FIELDS = []
    
    first_name = None
    last_name = None

    objects = UserManager()

    def __str__(self):
        return self.email