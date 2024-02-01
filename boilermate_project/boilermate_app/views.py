# boilermate_app/views.py
from rest_framework import viewsets
from .models import Classes
from .serializers import ClassesSerializer

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Classes.objects.all()
    serializer_class = ClassesSerializer
