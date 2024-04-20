import requests
import json
from bs4 import BeautifulSoup


def get_topics():
    # hard coding part of the url
    dynamicCourseUrl = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/"

    # list of classes page to scrape
    classesUrl = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/coursesUndergrad"

    # Send a GET request to the URL
    classResponse = requests.get(classesUrl)

    # Gets some of the schedule tags
    titles = []
    links = []

    # Create a dictionary with keys to an array of topics, the keys will be the course names
    classTopics = {}

    # Check if the request was successful
    if classResponse.status_code == 200:
        # Parse the content of the page with BeautifulSoup
        soup = BeautifulSoup(classResponse.content, 'html.parser')

        courses = soup.find_all(class_="number-title")

        for courses in courses:
            titles.append(courses.text)
            links.append(courses.find('a').get('href'))
            # print(courses.text)
            # print(courses.find('a').get('href'))

    # for titles in titles:
    #     print(titles)

    for titles, links in zip(titles, links):

        # print(titles + "\n\n\n")
        topicUrl = dynamicCourseUrl + links

        topicResponse = requests.get(topicUrl)
        topics = []

        if topicResponse.status_code == 200:
            soup = BeautifulSoup(topicResponse.content, 'html.parser')
            topicsSoup = soup.find_all(class_="topic")
            for topicsSoup in topicsSoup:
                topics.append(topicsSoup.text)
                # print(topicsSoup.text)
            classTopics[titles] = topics
    return classTopics
    # print(classTopics)

def save_to_json_file(classTopics, filename="class_topics.json"):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(classTopics, file, ensure_ascii=False, indent=4)

classTopics = get_topics()
save_to_json_file(classTopics)

# # URL to scrape
# url = "https://engineering.purdue.edu/ECE/Academics/Undergraduates/UGO/CourseInfo/courseInfo?courseid=716&show=true&type=undergrad"
#
# # Send a GET request to the URL
# response = requests.get(url)
#
# # Check if the request was successful
# if response.status_code == 200:
#     # Parse the content of the page with BeautifulSoup
#     soup = BeautifulSoup(response.content, 'html.parser')
#
#     # This shows most of the stuff I think
#     #print(soup.prettify())
#
#     # Gets some of the schedule tags
#     topics = soup.find_all(class_="topic")
#     for topics in topics:
#         print(topics.text)
# else:
#     print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
