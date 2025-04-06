from django.urls import path
from . import views


urlpatterns = [
    path('rec/', views.RecsView.as_view()),
    path('location/', views.LocationView.as_view()),
    path('utils/', views.UtilsView.as_view()),
]

