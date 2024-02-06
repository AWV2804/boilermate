from rest_framework.throttling import UserRateThrottle

class FirebaseThrottle(UserRateThrottle):
    scope = 'firebase_request'
    rate = '5/second'