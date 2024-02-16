import requests, secrets
from bs4 import BeautifulSoup
from firebase_admin import db
from django.http import HttpResponse

def generate_token():
    return secrets.token_urlsafe(32)

class URLScraper:
    def __init__(self, url):
        self.url = url

    def save_to_firebase(self, department, classTopics):
        # Get a reference to the Firebase database
        department = department.strip()
        ref = db.reference('Classes')
        for title, topics in classTopics.items():
            titleD = title.replace('\r', '').replace('\n', '').replace('/', '\u2215')
            topics_str = str(', '.join(topics))
            # print(f'{titleD}: {topics_str}')
            ref.child(department).child(titleD).set(topics_str)

    def get(self):
        # hard coding part of the url
        # dynamic_course_url = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/"
        # list of classes page to scrape
        classesUrl = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/coursesUndergrad"
        dept = "ECE"

        classResponse = requests.get(classesUrl)
        titles = []
        links = []
        classTopics = {}

        if classResponse.status_code == 200:
            soup = BeautifulSoup(classResponse.content, 'html.parser')
            courses = soup.find_all(class_="number-title")

            for course in courses:
                titles.append(course.text)
                links.append(course.find('a').get('href'))

            for title, link in zip(titles, links):
                topicUrl = self.url + link
                topicResponse = requests.get(topicUrl)
                topics = []

                if topicResponse.status_code == 200:
                    soup = BeautifulSoup(topicResponse.content, 'html.parser')
                    topicsSoup = soup.find_all(class_="topic")
                    for topicSoup in topicsSoup:
                        topics.append(topicSoup.text)
                    classTopics[title] = topics
            self.save_to_firebase(dept, classTopics)
            return HttpResponse('Scraped Classes saved to Firebase Database')
        else:
            return HttpResponse('Failed to fetch webpage')