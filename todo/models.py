from django.db import models

from soar.utils.models import TimestampModel

class Todo(TimestampModel):
    title = models.CharField(max_length=100)
    done = models.BooleanField()
    position = models.IntegerField()
    owner = models.CharField(max_length=200)
    
    def save(self, *args, **kwargs):
        if not self.pk:
            #TODO: Set the default value of position
            self.position = Todo.objects.count() + 1
        super(Todo, self).save(*args, **kwargs) # Call the "real" save() method.