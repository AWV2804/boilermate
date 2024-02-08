from django.http import HttpResponse
from .utils import URLScraper
import requests
from pathlib import Path
from django.http import JsonResponse
from django.shortcuts import render
from .settings import getPath
import firebase_admin.auth
from django.http import JsonResponse
from firebase_admin import db


def login(request):
    if request.method == 'POST':
        email = request.POST.get('Email')
        password = request.POST.get('Password')
        ref = db.reference('Users')
        user_ref = ref.child('Email').get()

        if user_ref:
            # If the username is found, check if the password matches
            for uid, user_data in user_ref.items():
                if user_data.get('Password') == password:
                    return JsonResponse({'message': 'Login successful'}, status=200)
            # If the password doesn't match, return an error response
            return JsonResponse({'error': 'Incorrect password'}, status=400)
        else:
            # If the username is not found, return an error response
            return JsonResponse({'error': 'Username not found'}, status=400)

    # Return a 405 Method Not Allowed response if the request method is not POST
    return JsonResponse({'error': 'Method Not Allowed'}, status=405)

def parse_and_send_view(request):
    scraper = URLScraper(r'https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/')
    response = scraper.get() # to be changed by user input
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