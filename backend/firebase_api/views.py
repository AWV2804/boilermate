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
import re
import pytz
import random

# Create your views here.
class UserHandler(APIView):
    def initialize_user(self, username):
        try:
            ref = db.reference('Users')
            if username not in ref.get().keys():
                current_datetime = datetime.now().strftime('%Y-%m-%d')
                ref.child(username).set({
                    'streak': 0,
                    'credits': 0,
                    'last_login': current_datetime
                })
            return True, 'success'
        except Exception as e:
            return False, str(e)
    
    def check_consecutive_login(self, username):
        try:
            user_ref = db.reference(f'Users/{username}')
            if user_ref is None:
                return JsonResponse({'message': 'User not found in database'})
            user_data = user_ref.get()
            last_login = user_data.get('last_login')
            if last_login:
                last_login_date = datetime.strptime(last_login, '%Y-%m-%d').date()
                today_date = datetime.now(pytz.utc).date()
                if last_login_date == today_date:
                    return True, 'user already logged in today'
                elif last_login_date >= today_date - timedelta(days=1):
                    user_ref.update({'streak': user_data.get('streak', 0) + 1})
                else:
                    user_ref.update({'streak': 0})
            user_ref.update({'last_login': today_date.strftime('%Y-%m-%d')})
            return True, 'success'
        except Exception as e:
            return False, str(e)

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
        username = request.GET.get('username')
        username = re.sub(r'@.*', '', username)
        action = request.GET.get('action') #determine in frontend JSON whether or not action is login watch
        if action == 'create':
            if db.reference(f'Users/{username}').get() is None:
                works, errMessage = self.initialize_user(username)
                if works == False:
                    return JsonResponse({'message': errMessage},status=400)
                else:
                    return JsonResponse({'message': errMessage},status=201)
            else:
                return JsonResponse({'message': 'user already registered to firebase domain'},status=200)
        if action == 'login': 
            boolean, message = self.check_consecutive_login(username)
            if boolean == False:
                return JsonResponse({'message': message}, status=400)
            else:
                return JsonResponse({'message': message}, status=201)
        elif action == 'watch':
            video_time = int(request.GET.get('video_time'))
            video_id = request.GET.get('video_id')
            self.earn_credits_for_watching_video(username, video_id, video_time)
            return JsonResponse({'message': 'Success'}, status=201)
        else:
            return JsonResponse({'message': 'Failure'}, status=400)
        
    def get(self, request):
        user_ref = request.GET.get('username')
        user_ref = re.sub(r'@.*', '', user_ref)
        ref = db.reference('Users')
        user_info = ref.child(user_ref).get()
        if user_info is None:
            return JsonResponse({'message': 'User not found'}, status=404)
        elif user_info:
            username = ref.child(user_ref).key #username
            streaks = user_info.get('streak')
            credits = user_info.get('credits')
            last_login_day = user_info.get('last_login')

            return JsonResponse({
                'username': username,
                'streaks': streaks,
                'credits': credits,
                'last_login_day': last_login_day
            })

class YoutubeVideoView(APIView):
    @classmethod
    def scrape_youtube_videos(self, topic, class_name, replacements_needed):
        try:
            api_key = 'AIzaSyBCWCmdRqhjI6LcZdwNtQEKbBqgbl18eqU'
            query = f"{topic} in {class_name}"
            url = f'https://www.googleapis.com/youtube/v3/search?key={api_key}&q={query}&part=snippet&maxResults={replacements_needed}&type=video' # 10000 daily queries
            response = requests.get(url)                    
            data = response.json()
            items = data.get('items', [])

            for item in items:
                video_id = item.get('id', {}).get('videoId')
                if not video_id:
                    continue
                video_ref = db.reference(f'Videos/{topic}/{video_id}')
                if video_ref.get() is None:
                    video_ref.set({
                        'title': item['snippet']['title'],
                        'rating': 50
                    })
                
            return True, "videos scraped successfully"
        except Exception as e:
            return False, str(e)
    
    @classmethod
    def fetch_youtube_videos(self, topic, videos_needed): 
        try:   
            video_ref = db.reference(f'Videos/{topic}').get()
            videos = []
            video_ids = list(video_ref.keys())
                
            while len(videos) < videos_needed:
                random_id = random.choice(video_ids)
                video_ids.remove(random_id)
                ref = db.reference(f'Videos/{topic}/{random_id}')
                if ref.get().get('rating') >= 40:
                    videos.append({
                        'title': ref.get().get('title'),
                        'videoId': random_id,
                        'url': f"https://www.youtube.com/watch?v={random_id}"
                    })

            return videos, "success", True
        except Exception as e:
            return videos, str(e), False
        
    def post(self, request):
        dept = request.GET.get('department')
        class_name = request.GET.get('class_name')
        topic_id = request.GET.get('topic')
        class_name = re.sub(r'^.*?-\s*', '', class_name)
        save_success = FirebaseHandler.save_to_firebase(dept, class_name, topic_id)
        if save_success == False:
            return JsonResponse({'error': 'failed to save to firebase'}, status=500)
        ref = db.reference(f'Videos/{topic_id}')
        if ref.get() is None:
            worked, message = self.scrape_youtube_videos(topic_id, class_name, 1000)
            if worked == False:
                return JsonResponse({'Error:': message}, status=400)
        videos, message, worked = self.fetch_youtube_videos(topic_id, 20)
        if worked == False:
            return JsonResponse({'Error': message},status=500)
        return JsonResponse({'videos': videos},status=201)

class FirebaseHandler(APIView):
    @classmethod
    def save_to_firebase(cls, department, class_name, topic):
        try:
            ref = db.reference('Classes')
            class_name = class_name.replace('/', '\u2215')
            topic.lower()
            updated_topic = ref.child(department).child(class_name).get()
            updated_topic = updated_topic.lower() if updated_topic else ''
            if updated_topic is None:
                ref.child(department).child(class_name).set(topic)
            else:
                topics_list = [t.strip() for t in updated_topic.split(',')]
                if topic not in topics_list:
                    topics_list.append(topic)
                    updated_topic = ', '.join(topics_list)
                    ref.child(department).child(class_name).set(updated_topic)
                    saved_data = ref.child(department).child(class_name).get()
                    if saved_data == updated_topic:
                        saved_data = ref.child(department).child(class_name).get()
                        if saved_data == updated_topic:
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
            return JsonResponse({'message': message}, status=400)
        
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
    