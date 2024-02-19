from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=200, unique=True)
    streak = models.IntegerField(default=0)
    credits = models.IntegerField(default=0)
    last_login = models.DateField(null=True)
    
    def __str__(self):
        return self.username