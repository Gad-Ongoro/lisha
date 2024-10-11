from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from api.utils import send_sms
from api.models import Product, Order
from mpesa.models import Transaction
from mpesa.utils import lipa_na_mpesa_stk_push

class USSDAPIView(APIView):
    def post(self, request, *args, **kwargs):
        session_id = request.data.get('sessionId')
        service_code = request.data.get('serviceCode')
        phone_number = request.data.get('phoneNumber')
        text = request.data.get('text')

        text_array = text.split('*')

        if text == '':
            response_text = "CON Welcome to GOFoods \n"
            response_text += "1. Order a product \n"
            response_text += "2. Exit"

        elif text_array[0] == "1":
            if len(text_array) == 1:
                products = Product.objects.all()
                product_list = "\n".join([f"{i+1}. {product.name}" for i, product in enumerate(products)])
                response_text = f"CON Select a product:\n{product_list}"
            elif len(text_array) == 2:
                product_index = int(text_array[1]) - 1
                selected_product = Product.objects.all()[product_index]
                response_text = f"CON How many {selected_product.name} would you like to order?"
            elif len(text_array) == 3:
                quantity = int(text_array[2])
                selected_product = Product.objects.all()[int(text_array[1]) - 1]
                total_price = selected_product.price * quantity
                response_text = f"CON Confirm order of {quantity} {selected_product.name}(s) for Ksh {total_price}\n1. Confirm\n2. Cancel"
            elif len(text_array) == 4:
                if text_array[3] == "1":
                    # Create the order
                    product = Product.objects.all()[int(text_array[1]) - 1]
                    quantity = int(text_array[2])
                    total_price = product.price * quantity

                    # Save the order to the database
                    order = Order.objects.create(
                        phone_number=phone_number,
                        product=product,
                        quantity=quantity,
                        total_price=total_price,
                        order_status='Pending',
                        order_source='ussd'
                    )

                    # mpesa payment
                    lipa_na_mpesa_stk_push(phone_number, total_price)
                    
                    mpesa_number = str(phone_number).replace('+', '')
                    response = lipa_na_mpesa_stk_push(mpesa_number, 1)
                    if response.get('ResponseCode') == '0':
                        transaction = Transaction.objects.create(
                            phone_number=phone_number,
                            amount=total_price,
                            checkout_request_id=response['CheckoutRequestID'],
                            merchant_request_id=response['MerchantRequestID']
                        )
                        # return Response({"Response": response}, status=status.HTTP_201_CREATED)
                    else:
                        message = f"Your order for {quantity} {product.name}(s) has been cancelled. Please try again. Thank you for shopping with GOFoods!"
                        send_sms(phone_number, message)
                        return Response({"error": "Failed to initiate payment", "Response": response}, status=status.HTTP_400_BAD_REQUEST)

                    # sms
                    try:
                        message = f"Your order for {quantity} {product.name}(s) has been placed for Ksh {total_price}. Thank you for shopping with GOFoods!"
                        send_sms(phone_number, message)

                        response_text = "END Your order has been placed successfully. A confirmation SMS has been sent. Thank you for shopping with GOFoods!"
                    except Exception as e:
                        response_text = f"END Failed to place order. Please try again later. Error: {str(e)}"
                else:
                    response_text = "END Order cancelled."
        else:
            response_text = "END Thank you for choosing GOFoods."

        return HttpResponse(response_text)
