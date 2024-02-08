import requests
from bs4 import BeautifulSoup
import firebase_admin
from firebase_admin import credentials, db
from django.http import HttpResponse

class URLScraper:
    def __init__(self, firebase_credentials_path):
        cred = credentials.Certificate(firebase_credentials_path)
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://boilermate-b3fcd-default-rtdb.firebaseio.com'
        })

    def save_to_firebase(self, department, course_text, link):
        # Get a reference to the Firebase database
        department = department.strip()
        ref = db.reference('Classes')
        ref.child(department).child(course_text).set(link)

    def get(self, url):
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
                link = url + course.find('a').get('href')
                # Save to Firebase
                self.save_to_firebase(department, course_text, link)
            return HttpResponse('Scraped Classes saved to Firebase Database')
        else:
            return HttpResponse('Failed to fetch webpage')

        