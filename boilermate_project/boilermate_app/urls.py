# boilermate_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, VideoViewSet
from .urls import home

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'videos', VideoViewSet)

urlpatterns = [
    path('', home, name='home'),
    path('', include(router.urls)),
]