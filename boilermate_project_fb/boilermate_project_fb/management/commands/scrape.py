from django.core.management.base import BaseCommand
from boilermate_project_fb.utils import URLScraper

class Command(BaseCommand):
    help = 'Scrape URLs and save to firebase'
    
    def handle(self, *args, **options):
        scraper = URLScraper('c:\Users\mli00\Desktop\Purdue\ECE 49595O\boilermate-b3fcd-firebase-adminsdk-rwh4i-30e3b04f5c.json')
        response = scraper.get('https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/')
        print(f'{response}')