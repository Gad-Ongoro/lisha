from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from . import models
from . import serializers

# Create your views here.
# user views
class UserCreateView(generics.CreateAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.CustomUserSerializer
    
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