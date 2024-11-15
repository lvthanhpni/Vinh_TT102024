# Django imports
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse

# Django REST Framework imports
from rest_framework import viewsets, status  
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken

# Model imports
from EOB.models import Member, Individual, Organization, VLXD

# Serializer imports
from .serializers import MemberSerializer, IndividualSerializer, OrganizationSerializer, VLXDSerializer, SignupSerializer, UserSerializer

#Json import       
import json

# Use get_user_model to refer to your custom Member model
Member = get_user_model()

# DRF Viewsets
class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class IndividualViewSet(viewsets.ModelViewSet):
    queryset = Individual.objects.all()
    serializer_class = IndividualSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class VLXDViewSet(viewsets.ModelViewSet):
    queryset = VLXD.objects.all()
    serializer_class = VLXDSerializer

@api_view(['POST'])
@csrf_exempt  # If needed, you can use csrf_exempt, but ensure CSRF protection is handled securely
def Signup_VLXD(request):
    if request.method == 'POST':
        # Debug: Print the incoming data to verify it's correctly received
        print("Received data:", request.data)

        cname = request.data.get('cname')
        phone = request.data.get('phone')
        email = request.data.get('email')
        job = request.data.get('job')
        checkbox = request.data.get('checkbox')
        try:
            # Create user
            user = Member.objects.create_user(username=cname, password=make_password('temporarypassword'), email=email)
            user.is_vlxd = True
            user.save()

            # Create VLXD profile
            VLXD_User = VLXD.objects.create(c_name=user, phone=phone, email=email, job=job)
            VLXD_User.save()

            # Return success response
            return JsonResponse({'message': 'Đăng ký thành công!'}, status=201)  # 201 for created status

        except Exception as e:
            # Log the error details for debugging purposes
            print(f"Error during signup: {e}")
            return JsonResponse({"error": "Đã có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại."}, status=500)

    return JsonResponse({'error': 'Yêu cầu không hợp lệ'}, status=400)

@api_view(['POST'])
@csrf_exempt
def Signup_mem(request):
    if request.method == "POST":
        # Initialize the serializer with incoming data
        serializer = SignupSerializer(data=request.data)
        
        # Validate the data
        if serializer.is_valid():
            member_type = serializer.validated_data.get("member_type")
            phone = serializer.validated_data.get("phone")
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("pass1")

            try:
                # Set a default username depending on member type
                if member_type == "individual":
                    print(f"Individual user") 
                    name = serializer.validated_data.get("uname")
                    user = Member.objects.create_user(username=name, email=email, password=make_password(password))
                    user.is_individual = True
                    user.save()
                    print(f"Individual user created with ID: {user.id}")

                    # Create Individual profile
                    individual_profile = Individual.objects.create(full_name=user, phone=phone, email=email)
                    individual_profile.save()
                    print(f"Individual profile created with ID: {individual_profile.id}")

                elif member_type == "organization":
                    name = serializer.validated_data.get("c_name")
                    tax = serializer.validated_data.get("tax")
                    user = Member.objects.create_user(username=name, email=email, password=make_password(password))
                    user.is_organization = True
                    user.save()
                    print(f"Organization user created with ID: {user.id}")

                    # Create Organization profile
                    organization_profile = Organization.objects.create(c_name=user, tax_num=tax, phone=phone, email=email)
                    organization_profile.save()
                    print(f"Organization profile created with ID: {organization_profile.id}")

                # Create a token for the new user
                token, created = Token.objects.get_or_create(user=user)
                print(f"Token created: {token.key}")

                # Return success response with token
                return JsonResponse({
                    'message': 'Signup successful!',
                    'token': token.key  # Include token in response
                }, status=201)

            except Exception as e:
                # Log error details for debugging purposes
                print(f"Error during signup: {e}")
                return JsonResponse({'success': False, 'errors': [str(e)]}, status=500)

        # If validation failed, return errors
        return JsonResponse({
            'error': 'Invalid data',
            'details': serializer.errors
        }, status=400)

    # Handle non-POST requests
    return JsonResponse({'error': 'Invalid request method. Only POST is allowed.'}, status=400)
    
@api_view(['POST'])
def Login(request):
    uname = request.data.get('uname')
    password = request.data.get('pass')
    remember_me = request.data.get('checkbox', False)

    # Authenticate the user
    user = authenticate(request, username=uname, password=password)

    if user is not None:
        if user.is_individual or user.is_organization:
            # Login the user
            login(request, user)

            # Generate or get existing token for the user
            token, created = Token.objects.get_or_create(user=user)

            # Optional: Handle remember me logic if needed for session length or cookies

            # Return the token as the response
            return Response({
                'success': True,
                'message': 'Login successful.',
                'token': token.key  # Returning the token here
            }, status=status.HTTP_200_OK)

        else:
            return Response({
                'success': False,
                'message': 'This user is not authorized to log in.'
            }, status=status.HTTP_403_FORBIDDEN)
    
    else:
        return Response({
            'success': False,
            'message': 'Login failed. Invalid credentials or user does not exist.'
        }, status=status.HTTP_400_BAD_REQUEST)

def check_login(request):
    if request.user.is_authenticated:
        return JsonResponse({'username': request.user.username})
    return JsonResponse({'message': 'User not logged in'}, status=403)

def logout_view(request):
    print(f'test 1')
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'})
    return JsonResponse({'error': 'Not authenticated'}, status=403)

@csrf_exempt
@api_view(['POST'])
def Logout(request):
    print(f'test 2')
    try:
        # Get the token from the request header (Authorization: Token <token_value>)
        token = request.headers.get('Authorization')
        print(token)
        if token is None:
            raise AuthenticationFailed('No token provided.')

        token = token.split()[1]  # Extract the token from 'Token <token_value>'

        # Find the Token object in the database
        token_obj = Token.objects.get(key=token)

        # Delete the token (this effectively logs the user out)
        token_obj.delete()

        return Response({
            'success': True,
            'message': 'Logout successful.'
        }, status=status.HTTP_200_OK)

    except Token.DoesNotExist:
        return Response({
            'success': False,
            'message': 'Invalid token. You are not logged in or the token has expired.'
        }, status=status.HTTP_400_BAD_REQUEST)

    except AuthenticationFailed as e:
        return Response({
            'success': False,
            'message': str(e)
        }, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({
            'success': False,
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

# Token view
class TokenListView(APIView):
    def get(self, request):
        users = Member.objects.all()
        data = []

        for user in users:
            refresh = RefreshToken.for_user(user)
            data.append({
                'username': user.username,
                'refresh_token': str(refresh),
                'access_token': str(refresh.access_token),
            })

        return Response(data)



# Regular Django views


def Base(request):
    return render(request, 'Base.html')


def Homepage(request):
    return render(request, 'Homepage.html')



