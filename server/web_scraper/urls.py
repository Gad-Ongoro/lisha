from django.urls import path
from . import views

urlpatterns = [
    path('scrape/', views.ScraperAPIView.as_view(), name='scrape-view'),
]