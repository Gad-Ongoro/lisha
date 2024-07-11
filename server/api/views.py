from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.mail import send_mail
import pyotp
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from . import models
from . import serializers

# Create your views here.
# user views
class UserCreateView(generics.CreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer
    
    def perform_create(self, serializer):
        user = serializer.save()

        # User's secret key
        if not user.otp_secret:
            user.otp_secret = pyotp.random_base32()
            user.save()

        totp = pyotp.TOTP(user.otp_secret, interval=600)
        otp = totp.now()

        # Email template
        subject = 'Welcome to GOFoods!'
        context = {
            'username': user.username,
            'otp': otp,
            'message': 'Your OTP code is:',
        }

        html_message = render_to_string('email_verification.html', context)
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        to = user.email

        send_mail(subject, plain_message, from_email, [to], html_message=html_message)
        
        # dev test
        return Response({'detail': 'OTP sent to your email.', 'otp': otp,}, status=status.HTTP_201_CREATED)

class UserVerificationOTPView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = request.data.get('otp')
        try:
            user = models.CustomUser.objects.get(email=email)
            totp = pyotp.TOTP(user.otp_secret, interval=600)

            if totp.verify(otp):
                if user.is_verified:
                    return Response({'detail': 'User already verified.'}, status=status.HTTP_400_BAD_REQUEST)
                
                user.is_verified = True
                user.save()
                return Response({'detail': 'User verified successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        except models.CustomUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_400_BAD_REQUEST)

class ResendVerificationOTPView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = models.CustomUser.objects.get(email=email)

            if user.is_verified:
                return Response({'detail': 'User already verified.'}, status=status.HTTP_400_BAD_REQUEST)

            if not user.otp_secret:
                user.otp_secret = pyotp.random_base32()
                user.save()

            totp = pyotp.TOTP(user.otp_secret, interval=600)
            otp = totp.now()

            # Email template context
            subject = 'New OTP Code'
            context = {
                'username': user.username,
                'otp': otp,
                'message': 'Here is your new OTP code:',
            }
            html_message = render_to_string('email_verification.html', context)
            plain_message = strip_tags(html_message)
            from_email = settings.DEFAULT_FROM_EMAIL
            to = user.email

            send_mail(subject, plain_message, from_email, [to], html_message=html_message)

            return Response({'detail': 'A new OTP has been sent to your email.'}, status=status.HTTP_200_OK)
        except models.CustomUser.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_400_BAD_REQUEST)

class UserListView(generics.ListAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer
    # permission_classes = [IsAuthenticated]
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.CustomUserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # return models.CustomUser.objects.filter(user=self.request.user)
        # return models.CustomUser.objects.filter(id=self.request.user.id)
        return models.CustomUser.objects.all()
    
# profile view
class ProfileListView(generics.ListAPIView):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    permission_classes = [IsAuthenticated]
    
class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Profile.objects.filter(user=self.request.user)

# product view
class ProductCreateView(generics.CreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAuthenticated]

class ProductListView(generics.ListAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    permission_classes = [AllowAny]

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Product.objects.filter(user=self.request.user)
    
# order
class OrderListCreateView(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer
    permission_classes = [IsAuthenticated]

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Order.objects.filter(user=self.request.user)
    
# review
class ReviewCreateView(generics.CreateAPIView):
    queryset = models.Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = [IsAuthenticated]

class ReviewListView(generics.ListAPIView):
    queryset = models.Review.objects.all()
    serializer_class = serializers.ReviewSerializer
    permission_classes = [AllowAny]
    
class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ReviewSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return models.Review.objects.filter(user=self.request.user)