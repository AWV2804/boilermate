from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField()

    def __str__(self):
        return self.username
class Video(models.Model):
    video = models.TextField(max_length=255)
    
    def __str__(self):
        return self.video