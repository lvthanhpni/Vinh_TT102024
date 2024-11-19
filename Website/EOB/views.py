# Django imports
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password # type: ignore
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
from .serializers import MemberSerializer, IndividualSerializer, OrganizationSerializer, VLXDSerializer

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
        # Debug: Print the incoming data to verify it's correctly received
        print("Received data:", request.data)

        # Extract common data
        member_type = request.data.get("member_type")
        phone = request.data.get("phone")
        email = request.data.get("email")
        password = request.data.get("pass")
        r_password = request.data.get("rpass")

        try:
            # Set a default username depending on member type
            if member_type == "individual":
                print(f"Creating individual user")
                name = request.data.get("uname")
                user = Member.objects.create_user(username=name, email=email, password=password)
                user.is_individual = True
                user.save()
                print(f"Individual user created with ID: {user.id}")

                # Create Individual profile
                individual_profile = Individual.objects.create(full_name=user, phone=phone, email=email)
                individual_profile.save()
                print(f"Individual profile created with ID: {individual_profile.id}")

            elif member_type == "organization":
                print(f"Creating organization user")
                name = request.data.get("c_name")
                tax = request.data.get("tax")
                user = Member.objects.create_user(username=name, email=email, password=password)
                user.is_organization = True
                user.save()
                print(f"Organization user created with ID: {user.id}")

                # Create Organization profile
                organization_profile = Organization.objects.create(c_name=user, tax_num=tax, phone=phone, email=email)
                organization_profile.save()
                print(f"Organization profile created with ID: {organization_profile.id}")

            # Return success response
            return JsonResponse({'message': 'Signup successful!'}, status=201)

        except Exception as e:
            # Log error details for debugging purposes
            print(f"Error during signup: {e}")
            return JsonResponse({'success': False, 'errors': [str(e)]}, status=500)

    # Handle non-POST requests
    return JsonResponse({'error': 'Invalid request method. Only POST is allowed.'}, status=400)

    
@api_view(['POST'])
def Login(request):
    uname = request.data.get('uname')
    password = request.data.get('pass')
    remember_me = request.data.get('checkbox', False)

    # Authenticate the user
    user = authenticate(request, username=uname, password=password)
    print(user)
    if user is not None:
        if (user.is_individual or user.is_organization):
            login(request, user)
            return Response({'success': True, 'message': 'Login successful.'})
        else:
            return Response({'success': False, 'message': 'This user is not authorized to log in.'}, status=403)
    else:
        return Response({'success': False, 'message': 'Login failed. User does not exist.'}, status=400)

def check_login(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'username': request.user.username,
            'email': request.user.email,
        })
    return JsonResponse({'message': 'User not logged in'}, status=403)


@api_view(['POST'])
def Logout(request):
    refresh_token = request.data.get('refresh')
    try:
        logout(request)
        token = RefreshToken(refresh_token)
        token.blacklist()  # Blacklist the token
        return Response({'success': True, 'message': 'Logged out successfully.'})
    except Exception as e:
        return Response({'success': False, 'message': 'Invalid token or logout failed.'}, status=400)
    

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


@api_view(['GET'])
def protected_view(request):
    return Response({'message': 'This is a protected view!'})


# Regular Django views


def Base(request):
    return render(request, 'Base.html')


def Homepage(request):
    return render(request, 'Homepage.html')



