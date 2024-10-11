from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework.exceptions import AuthenticationFailed
from django.utils.encoding import smart_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from . import models
from . utils import send_normal_email

# user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_verified', 'is_google_user', 'password', 'date_joined', 'updated_at']
        extra_kwargs = {
            'password': {'write_only': True},
            'otp_secret': {'read_only': True},
            'is_verified': {'read_only': True},
            'is_google_user': {'read_only': True},
        }

    def create(self, validated_data):
        if not validated_data.get('is_google_user', False):
            validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if models.User.objects.filter(email=email).exists():
            user= models.User.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request=self.context.get('request')
            current_site = get_current_site(request).domain
            relative_link = reverse('password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            abslink=f"http://{current_site}{relative_link}"
            print(abslink)
            email_body=f"Hi {user.first_name} use the link below to reset your password {abslink}"
            data={
                'email_body':email_body, 
                'email_subject':"Reset your Password", 
                'to_email':user.email
                }
            send_normal_email(data)

        return super().validate(attrs)
    
class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64=serializers.CharField(min_length=1, write_only=True)
    token=serializers.CharField(min_length=3, write_only=True)

    class Meta:
        fields = ['password', 'confirm_password', 'uidb64', 'token']

    def validate(self, attrs):
        try:
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')
            password=attrs.get('password')
            confirm_password=attrs.get('confirm_password')

            user_id=force_str(urlsafe_base64_decode(uidb64))
            user=models.User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("reset link is invalid or has expired", 401)
            if password != confirm_password:
                raise AuthenticationFailed("passwords do not match")
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            return AuthenticationFailed("link is invalid or has expired")

class LogoutUserSerializer(serializers.Serializer):
    refresh_token=serializers.CharField()
    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }
    def validate(self, attrs):
        self.token = attrs.get('refresh_token')

        return attrs

    def save(self, **kwargs):
        try:
            token=RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail('bad_token')

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
        
# cart
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cart
        fields = '__all__'
        
# review
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Review
        fields = '__all__'