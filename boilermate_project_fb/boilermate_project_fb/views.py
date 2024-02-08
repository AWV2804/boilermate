from django.http import HttpResponse
from .utils import URLScraper
import requests
from pathlib import Path
from django.http import JsonResponse
from django.shortcuts import render

def parse_and_send_view(request):
    thePath = Path(r'/mnt/c/Users/mli00/Desktop/Purdue/ECE 49595O/Boilermate-b3fcd-firebase-adminsdk-rwh4i-30e3b04f5c.json') # subjected to change soon, change when move to cloud
    scraper = URLScraper(thePath)
    response = scraper.get(r'https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/') # to be changed by user input
    # print(f'{response}')
    return HttpResponse(response)


def call_rest_api_view_and_return(request):
    response = requests.get('put url of frontend login here')
    # view credentials in firebase, then return post to user at frontend to move onto next webpage
    if response.status.code == 200:
        return JsonResponse(response.json())
    else:
        return JsonResponse({'error': 'Failed to fetch dat from the REST API'}, status=500)

def front_page(request):
    return render(request, 'front_page.html') # replace with frontend html page