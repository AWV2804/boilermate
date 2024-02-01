from django.db import models

class Classes(models.Model):
    classes = models.CharField(max_length=200)
    topics = models.TextField()
    videoUrls = models.TextField()
    
# class Item():