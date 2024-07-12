from django.urls import path

from . import views

urlpatterns = [
    path("lipa-na-mpesa/", views.SendSTKPushView.as_view(), name="Mpesa STK"),
    path("callback/", views.MpesaCallbackView.as_view(), name="callback"),
    path("transactions/", views.TransactionView.as_view(), name="transactions")
]