from django.urls import path
from . import views

urlpatterns = [
    path('scrape-youtube-videos/', views.YoutubeVideoView.as_view(), name='scrape_youtube_videos'), #post method
    path('save-to-firebase/', views.FirebaseHandler.as_view(), name='save_to_firebase'), #post method
    path('fetch-from-firebase/', views.FirebaseHandler.as_view(), name='fetch_from_firebase'), #get method
    path('handle-user/', views.UserHandler.as_view(), name='handle-user'),
]
