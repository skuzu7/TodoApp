from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=200, default='Default Description')
    completed = models.BooleanField(default=False)
    category = models.CharField(max_length=200, blank=True, null=True)  # Aqui, usamos CharField

    def __str__(self):
        return self.title
