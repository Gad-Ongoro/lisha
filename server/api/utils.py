from django.core.mail import EmailMessage
import africastalking
from django.http import JsonResponse
from django.conf import settings

def send_normal_email(data):
    email=EmailMessage(
        subject=data['email_subject'],
        body=data['email_body'],
        from_email=settings.EMAIL_HOST_USER,
        to=[data['to_email']]
    )
    email.send()

# SMS Service
africastalking.initialize(
    settings.AFRICAS_TALKING_USERNAME,
    settings.AFRICAS_TALKING_API_KEY
)

sms = africastalking.SMS

def send_sms(phone_number, details):
    message = details

    try:
        response = sms.send(message, [phone_number])
        return JsonResponse({"success": True, "message": "SMS sent", "response": response}, status=200)

    except Exception as e:
        return JsonResponse({"success": False, "error": f"An unexpected error occurred: {str(e)}"}, status=500)