# boilermate_app/serializers.py
from rest_framework import serializers
from .models import Classes

class ClassesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classes
        fields = '__all__'
