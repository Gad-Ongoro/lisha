from django.urls import path
from . import views

urlpatterns = [
    path('lipa-na-mpesa/', views.LipaNaMpesaView.as_view(), name='Lipa Na Mpesa'),
]