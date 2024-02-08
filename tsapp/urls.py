from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("game", views.game, name="game"),
    path("game_over", views.game_over, name="game_over"),
    path("leaderboard", views.leaderboard, name="leaderboard"),
    path("save_score", views.save_score, name="save_score"),
]