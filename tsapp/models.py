from django.db import models

# Create your models here.

class Gamer(models.Model):
    name = models.TextField(max_length=500)
    score = models.IntegerField()
    
    def __str__(self):
        return self.name
            
            
    

    