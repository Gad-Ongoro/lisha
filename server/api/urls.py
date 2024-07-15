from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # user
    path('users/register/', views.UserCreateView.as_view(), name='User Register'),
    path('users/', views.UserListView.as_view(), name='Users List'),
    path('users/<uuid:pk>/', views.UserDetailView.as_view(), name='User Detail'),
    path('user-verification-otp/', views.UserVerificationOTPView.as_view(), name='OTP Account Verification'),
    path('resend-verification-otp/', views.ResendVerificationOTPView.as_view(), name='resend-otp'),
    
    # password reset
    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/', views.SetNewPasswordView.as_view(), name='set-new-password'),

    # profile
    path('profiles/', views.ProfileListView.as_view(), name='Profile List'),
    path('profiles/<uuid:pk>/', views.ProfileDetailView.as_view(), name='Profile Detail'),
    
    # product
    path('products/create/', views.ProductCreateView.as_view(), name='Product Create'),
    path('products/', views.ProductListView.as_view(), name='Product List'),
    path('products/<uuid:pk>/', views.ProductDetailView.as_view(), name='Product Detail'),
    
    # order
    path('orders/', views.OrderListCreateView.as_view(), name='Order List Create'),
    path('orders/<uuid:pk>/', views.OrderDetailView.as_view(), name='Order Detail'),
    
    # review
    path('reviews/create/', views.ReviewCreateView.as_view(), name='Review Create'),
    path('reviews/', views.ReviewListView.as_view(), name='Review List'),
    path('reviews/<uuid:pk>/', views.ReviewDetailView.as_view(), name='Review Detail'),
]