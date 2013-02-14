import uuid
from django.shortcuts import render_to_response
from django.template import RequestContext

from todo.models import Todo

def home(request):
    owner = uuid.uuid5(uuid.NAMESPACE_URL, request.META['REMOTE_ADDR'])
    return render_to_response("public/home.html", {'owner': owner}, RequestContext(request))
    
    #'todos': Todo.objects.order_by('-position')