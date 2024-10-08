from django.http import HttpResponseRedirect, JsonResponse, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.conf import settings
from .utils import get_google_oauth_flow, fetch_google_token, verify_google_id_token, credentials_to_dict

User = get_user_model()

# Google OAuth2 flow initiator
class GoogleLoginAPIView(APIView):
    def get(self, request):
        flow = get_google_oauth_flow()
        flow.redirect_uri = settings.GOOGLE_REDIRECT_URI

        # authorization URL
        authorization_url, state = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true'
        )

        # state storage in session
        request.session['state'] = state
        return HttpResponseRedirect(authorization_url)
        # return Response({"authorization_url": authorization_url})

# Google login callback handler
class GoogleCallbackAPIView(APIView):
    def get(self, request):
        state = request.session.get('state')
        flow = get_google_oauth_flow(state=state)
        flow.redirect_uri = settings.GOOGLE_REDIRECT_URI

        # authorization response
        authorization_response = request.build_absolute_uri()
        credentials = fetch_google_token(flow, authorization_response)

        # credentials storage in session
        request.session['credentials'] = credentials_to_dict(credentials)

        # ID token verification
        try:
            idinfo = verify_google_id_token(credentials.id_token)

            # user information
            user_email = idinfo.get('email')
            user_name = idinfo.get('name')

            # create or get the user
            user, created = User.objects.get_or_create(email=user_email, defaults={
                'first_name': user_name.split()[0],
                'last_name': user_name.split()[1] if len(user_name.split()) > 1 else '',
                'is_google_user': True,
                'is_verified': True,
            })

            # JWT tokens
            refresh = RefreshToken.for_user(user)

            return JsonResponse({
                'email': user.email,
                'name': user_name,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })

        except ValueError:
            return HttpResponseBadRequest('Invalid token')


# React.JS (react-oauth/google) Credential Handler
class ReactGoogleOAuthCredentialHandler(APIView):
    def post(self, request):
        credentials = request.data.get('credentials')
        
        try:
            # CLIENT_ID of the app that accesses the backend:
            idinfo = verify_google_id_token(credentials)
            
            if not idinfo:
                return Response({'error': 'Invalid token'}, status=400)

            # user's Google Account info
            userid = idinfo['sub']
            user_email = idinfo.get('email')
            user_name = idinfo.get('name')
        
            # create or get the user
            user, created = User.objects.get_or_create(email=user_email, defaults={
                'first_name': user_name.split()[0],
                'last_name': user_name.split()[1] if len(user_name.split()) > 1 else '',
                'is_google_user': True,
                'is_verified': True,
            })
            
            # JWT tokens
            refresh = RefreshToken.for_user(user)

            return JsonResponse({
                'email': user.email,
                'name': user_name,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })

        except ValueError:
            # Invalid credentials
            return Response({'error': 'Invalid token'}, status=400)
