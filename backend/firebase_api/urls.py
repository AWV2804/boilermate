from django.urls import path
from . import views

urlpatterns = [
    path('scrape-website-data/', views.YoutubeVideoView.as_view(), name='scrape_youtube_videos'), #post method
    path('save-to-firebase/', views.FirebaseHandler.as_view(), name='save_to_firebase'), #post method
    path('fetch-from-firebase/', views.FirebaseHandler.as_view(), name='fetch_from_firebase'), #get method
    path('handle-user/', views.UserHandler.as_view(), name='handle-user'), #post and get method
    path('chat/', views.ChatGPTView.as_view(), name='chatgpt'), # POST method
    path('update-ratings/<str:topic>/', views.UpdateRatings.as_view(), name='update_ratings') # POST Method
]
