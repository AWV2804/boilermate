from django.urls import path, include
from boilermate_project_fb.utils import URLScraper
from rest_framework.routers import DefaultRouter
from boilermate_project_fb.views import parse_and_send_view#, call_rest_api_view

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('parse-and-send/', parse_and_send_view, name='parse_and_send'),
    # path('call-rest-api/', call_rest_api_view, name='call_rest_api'),
]
