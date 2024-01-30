# test_script.py
# from django.test import TestCase
import os
import django
from django.utils.crypto import get_random_string
from boilermate_app.models import User

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "boilermate_project.settings")
django.setup()

def create_and_save_user(username, email):
    # Create a new user instance
    new_user = User(username=username, email=email)

    # Save the user to the database
    new_user.save()

if __name__ == "__main__":
    # Example usage
    test_username = f"test_user_{get_random_string()[:5]}"  # Generate a random username
    test_email = f"{test_username}@example.com"

    create_and_save_user(test_username, test_email)

    print(f"User '{test_username}' with email '{test_email}' successfully saved to the database.")
