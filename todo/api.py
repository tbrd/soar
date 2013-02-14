import uuid
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from tastypie.resources import ModelResource
from todo.models import Todo

class TodoResource(ModelResource):
    class Meta:
        queryset = Todo.objects.order_by('-position')
        resource_name = 'todo'
        always_return_data=True
        authentication= Authentication()
        authorization= Authorization()
        filtering = {
            "owner": ('exact',)
        }
        
    def obj_create(self, bundle, request=None, **kwargs):
        return super(TodoResource, self).obj_create(bundle, request, owner=request.session['owner'])

    def apply_authorization_limits(self, request, object_list):
        return object_list.filter(owner=request.session['owner'])
    #def get_object_list(self, request):
    #    return super(TodoResource, self).get_object_list(request).filter(owner__exact=request.session['owner'])