from rest_framework import serializers
from django.core.mail import send_mail
from . import models

# user
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'verified', 'password', 'date_joined', 'updated_at']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = models.CustomUser.objects.create_user(**validated_data)
        self.email_user(
            'Welcome to GOFoods',
            'Welcome to GOFoods, your account has been successfully created. Please use this OTP to verify your account: ' + str(user.otp),
            'GOFoods', 
            **validated_data
        )
        return user
    
    def email_user(self, subject, message, from_email, **kwargs):
        send_mail(subject, message, from_email, [from_email], **kwargs)

# profile
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = '__all__'
        
# product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = '__all__'
        
# order
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = '__all__'
        
# review
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = '__all__'