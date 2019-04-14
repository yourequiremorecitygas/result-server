from django.views.generic.base import TemplateView

from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from console.models import Result
from .socket_client import getFileFromProcessServer
#View

class MainPage(TemplateView):
    template_name = 'main.html'

def read_data(request,pk):
    getFileFromProcessServer(str(pk))
    data = {"filename" : pk} 
    return JsonResponse(data)
