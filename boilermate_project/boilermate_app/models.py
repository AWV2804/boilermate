from django.db import models

class Classes(models.Model):
    name = models.CharField(max_length=200)
    links = models.TextField()