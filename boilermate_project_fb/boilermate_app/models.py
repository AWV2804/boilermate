from django.db import models
from django.utils import timezone

# Create your models here.
class PasswordResetRequest(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)