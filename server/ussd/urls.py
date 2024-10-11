from django.urls import path
from .views import USSDAPIView

urlpatterns = [
    path('callback/', USSDAPIView.as_view(), name='ussd'),
]
