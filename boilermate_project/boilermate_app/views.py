# boilermate_app/views.py
from rest_framework import viewsets
from .models import Classes
from .serializers import ClassesSerializer
from django.http import HttpResponse
from bs4 import BeautifulSoup
import requests
from django.views import View

class ScrapeView(View):
    template_name = 'scrape_result.html'
    
    def get(self, request):
        url = 'https://putsomethinghere.com' # replace with url we want to scrape
        response = requests.get(url)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            name = soup.title.string
            topics = ' '.join([p.text for p in soup.find_all('p')])
            
            new_class = Classes.objects.create(name=name, topics=topics)
            new_class.save() #saves content to the mysql database
            
            return HttpResponse(f'Scraped Class: {name} saved to database')
        else:
            return HttpResponse("Failed to fetch the webpage")

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Classes.objects.all()
    serializer_class = ClassesSerializer
