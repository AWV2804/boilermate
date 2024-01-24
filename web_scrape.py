import requests
from bs4 import BeautifulSoup

# URL to scrape
url = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/courseInfo?courseid=716&show=true&type=undergrad"

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the content of the page with BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # This shows most of the stuff I think
    #print(soup.prettify())

    # Gets some of the schedule tags
    topics = soup.find_all(class_="topic")
    for topics in topics:
        print(topics.text)
else:
    print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
