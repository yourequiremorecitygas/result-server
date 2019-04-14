from django.db import models
from django.utils import timezone

class Result(models.Model):
    title = models.CharField(max_length=200, default="")
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.created_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
