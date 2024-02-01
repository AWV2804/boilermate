# boilermate_app/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClassViewSet
from .views import ScrapeView
from .urls import home

router = DefaultRouter()
router.register(r'Classes', ClassViewSet, basename='classModel')

urlpatterns = [
    path('api/', include(router.urls)),
    path('scrape/', ScrapeView.as_view(), name='scrape_view'),
    path('', home, name='home'),
    path('', include(router.urls)),
]