from django.http import HttpResponse
import requests
from backend.settings import getPath
from pathlib import Path
from django.http import JsonResponse
from django.shortcuts import render
from firebase_admin import db
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView
from firebase_api.models import User
from datetime import datetime, timedelta
from django.conf import settings
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Create your views here.
class YoutubeAPI:
    def __init__(self):
        self.api_key = settings.YOUTUBE_API_KEY
    
    def fetch_duration_from_youtube_api(self, video_id):
        try:
            youtube = build('youtube', 'v3', developerKey=self.api_key)
            video_response = youtube.videos().list(
                part='contentDetails',
                id=video_id
            ).execute()

            duration = video_response['items'][0]['contentDetails']['duration']
            duration_in_seconds = self.parse_duration(duration)
            return JsonResponse({'duration': duration_in_seconds}, status=200)
            # Handle API errors here
        except Exception as e:
            return JsonResponse({'message': 'Bad request'}, status=400)
        
    def parse_duration(self, duration):
        hours = 0
        minutes = 0
        seconds = 0

        if 'H' in duration:
            hours = int(duration.split('H')[0][2:])
            duration = duration.split('H')[1]

        if 'M' in duration:
            minutes = int(duration.split('M')[0][2:])
            duration = duration.split('M')[1]

        if 'S' in duration:
            seconds = int(duration.split('S')[0][2:])

        total_seconds = hours * 3600 + minutes * 60 + seconds
        return total_seconds

class UserHandler(APIView):
    def initialize_user(self, username):
        ref = db.reference('Users')
        if username not in ref.get().keys():
            ref.child(username).set({
                'streak': 0,
                'credits': 0,
                'last_login': None
            })
    
    def check_consecutive_login(self, username):
        user_ref = db.reference(f'Users/{username}')
        user_data = user_ref.get()
        last_login = user_data.get('last_login')
        if last_login:
            last_login_date = datetime.strptime(last_login, '%Y-%m-%d')
            today_date = datetime.now().date()
            if last_login_date <= today_date - timedelta(days=1):
                user_ref.update({'streak': user_data.get('streak', 0) + 1})
            else:
                user_ref.update({'streak': 0})
        user_ref.update({'last_login': today_date.strftime('%Y-%m-%d')})

    def earn_credits_for_watching_video(self, username, video_id, video_time):
        try:
            user_ref = db.reference(f'Users/{username}')
            user_data = user_ref.get()
            video_duration = self.get_video_duration(video_id)
            if video_time >= video_duration / 2:
                credits_earned = video_time // 60
                user_ref.update({'credits': user_data.get('credits', 0) + credits_earned})
                return JsonResponse({'message': f'Earned {credits_earned} credits for watching the video'}, status=200)
            else:
                return JsonResponse({'message': 'Did not earn credits for watching the video'}, status=200)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)

    def post(self, request):
        username = request.POST.get('username')
        video_id = request.POST.get('video_id')
        action = request.POST.get('action') #determine in frontend JSON whether or not action is login watch
        video_time = int(request.POST.get('video_time'))

        if action == 'login': 
            self.check_consecutive_login(username)
            return JsonResponse({'message': 'Success'}, status=201)
        elif action == 'watch':
            self.earn_credits_for_watching_video(username, video_id, video_time)
            return JsonResponse({'message': 'Success'}, status=201)
        else:
            return JsonResponse({'message': 'Failure'}, status=400)
        
    def get(self, request, user_ref):
        ref = db.reference('Users')
        user_info = ref.child(user_ref).get()

        if user_info:
            username = user_info.get('username')
            streaks = user_info.get('streaks')
            credits = user_info.get('credits')
            last_login_day = user_info.get('last_login_day')

            return JsonResponse({
                'username': username,
                'streaks': streaks,
                'credits': credits,
                'last_login_day': last_login_day
            })
        else:
            return JsonResponse({'message': 'User not found'}, status=404)
    
    def get_video_duration(video_id):
        video_duration_seconds = YoutubeAPI.fetch_duration_from_youtube_api(video_id)
        return video_duration_seconds

class YoutubeVideoView(APIView):
    def scrape_youtube_videos(self, topic, class_name):
            api_key = 'AIzaSyBCWCmdRqhjI6LcZdwNtQEKbBqgbl18eqU'
            query = f'A Guide on how to do {topic} in {class_name}'
            url = f'https://www.googleapis.com/youtube/v3/search?key={api_key}&q={query}&part=snippet&maxResults=20&type=video'
            response = requests.get(url)
            data = response.json()
            items = data.get('items', [])

            videos = []
            replacements_needed = 0

            for item in items:
                video_id = item.get('id', {}).get('videoId')
                if not video_id:
                    continue

                video_rating = db.reference(f'Videos/{video_id}').get()
                if video_rating is None or video_rating >= 40:
                    videos.append({
                        'title': item['snippet']['title'],
                        'videoId': video_id,
                        'url': f"https://www.youtube.com/watch?v={video_id}"
                    })
                else:
                    replacements_needed += 1

            # Replace videos if replacements are needed
            if replacements_needed > 0:
                replacement_query = f'A Guide on how to do {topic}'
                replacement_url = f'https://www.googleapis.com/youtube/v3/search?key={api_key}&q={replacement_query}&part=snippet&maxResults={replacements_needed}&type=video'
                replacement_response = requests.get(replacement_url)
                replacement_data = replacement_response.json()
                replacement_items = replacement_data.get('items', [])

                for item in replacement_items:
                    video_id = item.get('id', {}).get('videoId')
                    if not video_id:
                        continue

                    videos.append({
                        'title': item['snippet']['title'],
                        'videoId': video_id,
                        'url': f"https://www.youtube.com/watch?v={video_id}"
                    })

            return videos
        
    def post(self, request):
        dept = request.POST.get('deptartment')
        class_name = request.POST.get('class_name')
        topic_id = request.POST.get('topic_id')
        save_success = FirebaseHandler.save_to_firebase(dept, class_name, topic_id)
        if save_success == False:
            return JsonResponse({'error': 'failed to save to firebase'}, status=500)
        videos = self.scrape_youtube_videos(topic_id, class_name)
        return JsonResponse({'videos': videos},status=201)

    def store_and_update_video_id(video_id):
        try:
            ref = db.reference('Videos')
            if video_id not in ref.get().keys():
                ref.child(video_id).set(50)
            return JsonResponse({'message': 'Success'}, status=201)
        except Exception as e:
            return JsonResponse({'message': e}, status=400)


class FirebaseHandler(APIView):
    @classmethod
    def save_to_firebase(cls, department, class_name, topic):
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
            return JsonResponse({'message': message}, status=201)
        
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
    