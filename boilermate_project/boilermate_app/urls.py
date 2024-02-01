# boilermate_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClassViewSet
from .urls import home

router = DefaultRouter()
router.register(r'Classes', ClassViewSet, basename='classModel')

urlpatterns = [
    path('api/', include(router.urls)),
    path('', home, name='home'),
    path('', include(router.urls)),
]