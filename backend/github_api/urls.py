from django.urls import path
from . import views

urlpatterns = [
    path('repos/', views.get_repositories, name='github-repositories'),
    path('stats/', views.get_github_stats, name='github-stats'),
    path('refresh/', views.refresh_cache, name='github-refresh-cache'),
    path('health/', views.health_check, name='github-health-check'),
]