from django.urls import path
from . import views


urlpatterns = [
    path('reg/', views.UserRegView.as_view()),
]

