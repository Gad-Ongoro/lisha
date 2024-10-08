from django.urls import path
from .views import GoogleLoginAPIView, GoogleCallbackAPIView, ReactGoogleOAuthCredentialHandler

urlpatterns = [
    path('login/', GoogleLoginAPIView.as_view(), name='google-login'),
    path('oauth2callback/', GoogleCallbackAPIView.as_view(), name='google-callback'),
    
    path('javascriptOAuthCallBack/', ReactGoogleOAuthCredentialHandler.as_view(), name='oauth2_javascriptCallBack'),
]
