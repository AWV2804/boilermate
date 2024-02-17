from django.http import HttpResponse
import requests
from backend.settings import getPath
from pathlib import Path
from django.http import JsonResponse
from django.shortcuts import render
from backend.settings import getPath
import firebase_admin.auth
from firebase_admin import db
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
class YoutubeVideoView(APIView):
    def scrape_youtube_videos(topic, class_name):
            api_key = 'AIzaSyBCWCmdRqhjI6LcZdwNtQEKbBqgbl18eqU'
            query = f'{topic} {class_name}'
            url = f'https://www.googleapis.com/youtube/v3/search?key={api_key}&q={query}&part=snippet&maxResults=10&type=video'
            response = requests.get(url)
            data = response.json()
            videos = [{'title': item['snippet']['title'], 'videoId': item['id']['videoId']} for item in data['items']]
            return videos
        
    def get(self, request, class_name, topic_id):
        topic = FirebaseHandler.fetch_topics(class_name, topic_id)
        videos = self.scrape_youtube_videos(topic)
        return Response({'videos': videos})

class FirebaseHandler(View):
    def save_to_firebase(self, department, class_name, topic):
        try:
            ref = db.reference('Classes')
            class_name = class_name.replace('/', '\u2215')
            topic.lower()
            updated_topic = ref.child(department).child(class_name).get()
            updated_topic.lower()
            if updated_topic is None:
                ref.child(department).child(class_name).set(topic)
            else:
                if updated_topic not in updated_topic.values():
                    updated_topic = ', ' + topic
                    ref.child(department).child(class_name).set(updated_topic)
                    saved_data = ref.child(class_name).get()
                    if saved_data['topic'] == topic:
                        return True, 'Topic saved successfully'
                    else:
                        return False, 'Failed to save topic'
                else:
                    return True, 'Topic already in firebase db'
        except Exception as e:
            return False, str(e)
        
            
    def post(self, request):
        department = request.POST.get('department')
        class_name = request.POST.get('class_name')
        topic = request.POST.get('topic')
        
        success, message = self.save_to_firebase(department, class_name, topic)
        
        if success:
            return JsonResponse({'message': message}, status=201)
        else:
            return JsonResponse({'message': message}, status=500)
        
    def get(self, class_name):
        try:
            ref = db.reference('Classes')
            data = ref.child(class_name).get()
            if data:
                return True, data
            else:
                return False, 'Class not found'
        except Exception as e:
            return False, str(e)
        
    def fetch_topics(class_name, topic_id):
        ref = db.reference(f'/Classes/{class_name}/{topic_id}')
        return ref.get()
    
    def fetch_class(class_name, department):
        ref = db.reference('Classes')
        class_key = ref.child(department).child(class_name).key
        return class_key
    