from django.shortcuts import render_to_response
from django.template import RequestContext

from todo.models import Todo

def home(request):
    return render_to_response("public/home.html", {'todos': Todo.objects.order_by('-position')}, RequestContext(request))