import requests, secrets
from bs4 import BeautifulSoup
from firebase_admin import db
from django.http import HttpResponse

def generate_token():
    return secrets.token_urlsafe(32)

class URLScraper:
    def __init__(self, url):
        self.url = url

    def save_to_firebase(self, department, course_text, link):
        # Get a reference to the Firebase database
        department = department.strip()
        ref = db.reference('Classes')
        ref.child(department).child(course_text).set(link)

    def get(self):
        # hard coding part of the url
        # dynamic_course_url = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/"
        # list of classes page to scrape
        classes_url = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/coursesUndergrad"
        
        # Send a GET request to the URL
        class_response = requests.get(classes_url)
        
        # Check if the request was successful
        if class_response.status_code == 200:
            # Parse the content of the page with BeautifulSoup
            soup = BeautifulSoup(class_response.content, 'html.parser')
            courses = soup.find_all(class_="number-title")
            department = "ECE" # change depending on students' major
            for course in courses:
                course_text = course.text.replace('\r', '').replace('\n', '').replace('/', '\u2215')
                link = self.url + course.find('a').get('href')
                # Save to Firebase
                self.save_to_firebase(department, course_text, link)
            return HttpResponse('Scraped Classes saved to Firebase Database')
        else:
            return HttpResponse('Failed to fetch webpage')

        