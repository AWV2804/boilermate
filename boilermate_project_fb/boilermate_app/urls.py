from django.urls import path
from boilermate_project_fb.utils import URLScraper

urlpatterns = [
    path('scrape/', URLScraper.as_view(), name='scrape_url'),
]
