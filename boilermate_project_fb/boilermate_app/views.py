# Inside your_app/views.py
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from django.http import JsonResponse
from .models import PasswordResetRequest
from boilermate_project_fb.utils import generate_token
from rest_framework import throttling
from firebase_admin import db

def password_reset_post(request):
    if request.method == 'POST':
        email = request.POST.get('Email')
        username = request.POST.get('Username')
        token = generate_token()

        # Store the password reset request in the database
        password_reset_request = db.reference('Users').child(email).push({'token': token})

        # Send an email with the password reset link
        reset_link = f"https://example.com/reset_password?token={token}"
        subject = f"Password Reset Request - {username}"
        message = render_to_string('password_reset_email.html', {'reset_link': reset_link, 'time': timezone.now()}) # password_reset_email to be replaced with written html
        sender = str(email)
        recipients = [email]

        send_mail(subject, message, sender, recipients)

        return JsonResponse({'message': 'Password reset email sent'}, status=200)

    return JsonResponse({'error': 'Method Not Allowed'}, status=405)

class RateThrottle(throttling.AnonRateThrottle):
    scope = 'rate_limit'

# Rate limit configuration
class BoilermateThrottle(throttling.SimpleRateThrottle):
    rate = '10/second'  # 10 requests per second
    scope = 'boilermate_limit'

# Throttle classes for views
class LoginThrottle(BoilermateThrottle):
    scope = 'login_limit'

class CreateAccountThrottle(BoilermateThrottle):
    scope = 'create_account_limit'

class PasswordResetThrottle(BoilermateThrottle):
    scope = 'password_reset_limit'