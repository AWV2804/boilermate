from django.urls import path
from . import views

urlpatterns = [
    path('scrape-youtube-videos/<str:class_name>/<str:topic_id>/', views.YoutubeVideoView.as_view(), name='scrape_youtube_videos'),
    path('save-to-firebase/', views.FirebaseHandler.as_view(), name='save_to_firebase'),
    path('fetch-from-firebase/<str:class_name>/', views.FirebaseHandler.as_view(), name='fetch_from_firebase'),
]
