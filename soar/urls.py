from django.conf.urls import patterns, include, url
from tastypie.api import Api
from todo.api import TodoResource

v1_api = Api(api_name='v1')
v1_api.register(TodoResource())

urlpatterns = patterns('',
    url(r'^$', 'public.views.home', name='home'),
    (r'^api/', include(v1_api.urls)),
)
