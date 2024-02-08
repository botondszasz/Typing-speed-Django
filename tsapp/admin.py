from django.contrib import admin
from django.contrib.auth.models import Group, User
from tsapp.models import Gamer

# Register your models here.
admin.site.unregister(Group)
admin.site.unregister(User)

admin.site.register(Gamer)