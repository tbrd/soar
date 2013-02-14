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
    
    def get_object_list(self, request):
        return super(TodoResource, self).get_object_list(request).filter(owner__exact=uuid.uuid5(uuid.NAMESPACE_URL, request.META["REMOTE_ADDR"]))