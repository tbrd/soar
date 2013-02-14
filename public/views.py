import uuid
from django.shortcuts import render_to_response
from django.template import RequestContext

from todo.models import Todo

def home(request):
    if 'owner' not in request.session:
        request.session['owner'] = uuid.uuid5(uuid.NAMESPACE_URL, request.META['REMOTE_ADDR']).hex
    return render_to_response("public/home.html", RequestContext(request))