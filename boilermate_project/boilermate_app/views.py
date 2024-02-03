# boilermate_app/views.py
from rest_framework import viewsets
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Classes
from .serializers import ClassesSerializer
from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
from django.views import View

class ScrapeView(View):
    def get(self, request):
        # hard coding part of the url
        dynamicCourseUrl = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/"
        # list of classes page to scrape
        classesUrl = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/coursesUndergrad"
        # Send a GET request to the URL
        classResponse = requests.get(classesUrl)
        # Check if the request was successful
        if classResponse.status_code == 200:
            # Parse the content of the page with BeautifulSoup
            soup = BeautifulSoup(classResponse.content, 'html.parser')
            courses = soup.find_all(class_="number-title")
            for courses in courses:
                courseText = courses.text
                courseText = courseText.replace('\r', '')
                courseText = courseText.replace('\n', '')
                link = dynamicCourseUrl + courses.find('a').get('href')
                new_class = Classes.objects.create(name=courseText, links=link)
                new_class.save()
            return HttpResponse(f'Scraped Classes saved to Database')
        else:
            return HttpResponse(f'Failed to fetch webpage')

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Classes.objects.all()
    serializer_class = ClassesSerializer
    
class APIViewset(APIView):
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
    
    def get(self, request):
        return Response({'message': 'Touched Base with API'})
