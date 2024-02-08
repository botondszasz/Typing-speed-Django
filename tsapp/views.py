from django.http import HttpResponse
from django.shortcuts import render
from .models import Gamer

# Create your views here.
def index(request):
    return render(request, "index.html")

def game(request):
    return render(request, "game.html")

def game_over(request):
    return render(request, "game_over.html")

def leaderboard(request):
    gamers = Gamer.objects.all().order_by('-score')[:5]
    return render(request, "leaderboard.html", {'gamers':gamers})

def save_score(request):
    if request.method == "POST":
        nameInput = request.POST['gamerName']
        scoreInput = request.POST['gamerScore']
        if Gamer.objects.filter(name=nameInput):
            gamer = Gamer.objects.get(name=nameInput)
            gamer.score = scoreInput
            gamer.save()
        else:
             Gamer.objects.create(
                name = request.POST['gamerName'],
                score = request.POST['gamerScore'],
            )
        return render(request, "index.html")
