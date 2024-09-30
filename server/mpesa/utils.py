from requests.auth import HTTPBasicAuth
from datetime import datetime
import requests
import base64
from dotenv import load_dotenv
import os

load_dotenv()

# M-Pesa Access Token
def generate_access_token():
    consumer_key = os.getenv('MPESA_CONSUMER_KEY')
    consumer_secret = os.getenv('MPESA_CONSUMER_SECRET')
    
    url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    response = requests.get(url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    return response.json().get('access_token')

# M-Pesa Express
def lipa_na_mpesa_stk_push(phone_number, amount):
    access_token = generate_access_token()
    checkout_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
    headers = {"Authorization": f"Bearer {access_token}"}

    mpesa_callback_url = os.environ.get('MPESA_CALLBACK_URL')
    # mpesa_callback_url = os.getenv('MPESA_CALLBACK_URL')
    
    # password
    business_short_code = os.getenv('MPESA_BUSINESS_SHORTCODE')
    lipa_na_mpesa_online_passkey = os.getenv('MPESA_PASSKEY')
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    data_to_encode = business_short_code + lipa_na_mpesa_online_passkey + timestamp
    password = base64.b64encode(data_to_encode.encode()).decode('utf-8')

    payload = {
        "BusinessShortCode": business_short_code,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": business_short_code,
        "PhoneNumber": phone_number,
        "CallBackURL": mpesa_callback_url,
        "AccountReference": "GOFoods",
        "TransactionDesc": "PayBill"
    }
    
    response = requests.post(checkout_url, json=payload, headers=headers)
    return response.json()
