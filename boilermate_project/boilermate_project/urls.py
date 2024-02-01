"""
URL configuration for boilermate_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# boilermate_app/urls.py
# boilermate_project/urls.py
from django.contrib import admin
from django.urls import path, include
from boilermate_app.views import ClassViewSet
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Boilermate App!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('boilermate_app.urls')),
]

