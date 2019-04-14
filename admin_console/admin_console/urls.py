"""admin_console URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib import admin
from django.conf import settings
from django.contrib.auth import views
from django.urls import path
from django.conf.urls import url, include

from .views import MainPage, read_data

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", MainPage.as_view(), name='main_page'),
    path("read/", MainPage.as_view(), name='main_page'),
    path("read/<int:pk>/", read_data, name="read_data"),
]
