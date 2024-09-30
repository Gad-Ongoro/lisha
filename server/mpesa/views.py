# payments/views.py
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from .models import Transaction
from .utils import lipa_na_mpesa_stk_push
from .serializers import TransactionSerializer
from datetime import datetime

# Payment API View
class MpesaPaymentView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        user = request.user
        phone_number = request.data.get('phone_number')
        amount = request.data.get('amount')

        response = lipa_na_mpesa_stk_push(phone_number, amount)
        if response.get('ResponseCode') == '0':
            transaction = Transaction.objects.create(
                user = user,
                phone_number=phone_number,
                amount=amount,
                checkout_request_id=response['CheckoutRequestID'],
                merchant_request_id=response['MerchantRequestID']
            )
            return Response({"Response": response}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Failed to initiate payment", "Response": response}, status=status.HTTP_400_BAD_REQUEST)
   
class TransactionListView(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Callback URL
class MpesaConfirmationView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data.get('Body', {}).get('stkCallback', {})
        checkout_request_id = data.get('CheckoutRequestID')
        result_code = data.get('ResultCode')
        result_description = data.get('ResultDesc')

        try:
            transaction = Transaction.objects.get(checkout_request_id=checkout_request_id)
            
            if result_code == 0:
                # Payment was successful
                transaction.status = 'Confirmed'
                transaction.mpesa_receipt_number = data['CallbackMetadata']['Item'][1]['Value']
                transaction_date_str = str(data['CallbackMetadata']['Item'][3]['Value'])
                transaction.transaction_date = datetime.strptime(transaction_date_str, '%Y%m%d%H%M%S')
                transaction.result_description = result_description
            else:
                # transaction failed/cancelled
                transaction.status = 'Failed'
                transaction.result_description = result_description

            transaction.save()
            return JsonResponse({"message": "Payment status updated"}, status=200)

        except Transaction.DoesNotExist:
            return JsonResponse({"error": "Transaction not found"}, status=404)
