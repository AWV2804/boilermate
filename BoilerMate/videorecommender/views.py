from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def recommend_videos(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        keywords = data.get('keywords', [])
        
        #make api request here to mysql database or through google analytics
        
        recommend_videos = ['Example 1', 'Example 2'] # will auto generate based on mysql or web scraping alg
        return JsonResponse({'recommended videos': recommend_videos})