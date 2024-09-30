from django.urls import path

from . import views

urlpatterns = [
    path("lipa-na-mpesa/", views.MpesaPaymentView.as_view(), name="Mpesa STK"),
    path("transactions/", views.TransactionListView.as_view(), name="transactions"),
    path("transactions/<uuid:pk>/", views.TransactionDetailView.as_view(), name="transaction-detail"),
    path('transaction/confirmation/', views.MpesaConfirmationView.as_view(), name='mpesa-confirmation'),
]