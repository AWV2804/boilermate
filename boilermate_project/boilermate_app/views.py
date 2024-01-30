# boilermate_app/views.py
from rest_framework import viewsets
from .models import User, Video
from .serializers import UserSerializer, VideoSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
