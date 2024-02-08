from django.urls import path, include
from boilermate_project_fb.utils import URLScraper
from rest_framework.routers import DefaultRouter
from boilermate_project_fb.views import parse_and_send_view, loginPost, create_account_post#, call_rest_api_view
from boilermate_app.views import password_reset_post
from .views import LoginThrottle, CreateAccountThrottle, PasswordResetThrottle, BoilermateThrottle

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('parse-and-send/', parse_and_send_view, name='parse_and_send'),
    path('login/', loginPost, name='login'),
    path('create_account/', create_account_post, name='create_account'),
    path('password_reset/', password_reset_post, name='password_reset'),
    # path('call-rest-api/', call_rest_api_view, name='call_rest_api'),
]

urlpatterns[1].throttle_classes = [BoilermateThrottle]
urlpatterns[2].throttle_classes = [LoginThrottle]
urlpatterns[3].throttle_classes = [CreateAccountThrottle]
urlpatterns[4].throttle_classes = [PasswordResetThrottle]