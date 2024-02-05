from django.shortcuts import render
import pyrebase

config = {
    "apiKey": "AIzaSyBCWCmdRqhjI6LcZdwNtQEKbBqgbl18eqU",
    "authDomain": "boilermate-b3fcd.firebaseapp.com",
    "databaseURL": "https://boilermate-b3fcd-default-rtdb.firebaseio.com",
    "projectId": "boilermate-b3fcd",
    "storageBucket": "boilermate-b3fcd.appspot.com",
    "messagingSenderId": "580822461058",
    "appId": "1:580822461058:web:924465940dde8843ae629b",
}

firebase = pyrebase.initialize_app(config)
authe = firebase.auth()
database = firebase.database()

# Create your views here.
def index(request):
    channel_name = database.child('Data').child('Name').get().val()
    #add more based on what's in tree of database
    return render(request, 'index.html', {
        "channel_name":channel_name,
        # "channel_type":channel_type
    }) 