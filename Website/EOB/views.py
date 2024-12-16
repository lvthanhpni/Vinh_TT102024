# Django imports
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.contrib.auth.hashers import make_password # type: ignore
from django.http import JsonResponse
from django.conf import settings


# Django REST Framework imports
from rest_framework import viewsets, status , permissions, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.authentication import TokenAuthentication
from datetime import timedelta, datetime

# Model imports
from EOB.models import Member, Individual, Organization, VLXD, Post, Folder   

# Serializer imports
from .serializers import MemberSerializer, IndividualSerializer, OrganizationSerializer, VLXDSerializer, PostSerializer

#Other import       
import json
from google.auth.transport.requests import Request
from google.oauth2.id_token import verify_oauth2_token
from google.oauth2 import id_token
from google.auth.transport import requests

# Use get_user_model to refer to your custom Member model
Member = get_user_model()

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    

    def get_permissions(self):

        if self.action == 'list':
             # Only allow admins to list all users
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]

    def list(self, request):
        """
        List all members, restricted to admin users only.
        """
        members = self.queryset
        serializer = self.serializer_class(members, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
       
        member = get_object_or_404(self.queryset, username=pk)  
        serializer = self.serializer_class(member)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        member = get_object_or_404(self.queryset, username=pk)
        serializer = self.serializer_class(member, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            # Return detailed validation errors
            raise ValidationError(serializer.errors)


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
@permission_classes([IsAuthenticated])
def create_post(request):
    try:
        # Extract data from request
        title = request.data.get('title')
        caption = request.data.get('caption')
        picture = request.FILES.get('picture')
        folder_path = request.data.get('folder')

        # Validate required fields
        if not title or not caption or not folder_path:
            return Response({"error": "Title, caption, and folder are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Find or create the folder
        folder_names = folder_path.split('/')
        parent_folder = None
        for name in folder_names:
            folder, created = Folder.objects.get_or_create(name=name, parent=parent_folder)
            parent_folder = folder

        # Create the post
        post = Post.objects.create(
            name=request.user.username,
            title=title,
            caption=caption,
            picture=picture,
            folder=parent_folder
        )

        # Serialize the post and return the response
        serializer = PostSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def get_posts(request):
    """
    Retrieve all posts and include like status for the current user.
    """
    try:
        # Fetch all posts
        posts = Post.objects.all()

        # Serialize the posts, passing the current request context for `is_liked` evaluation
        serializer = PostSerializer(posts, many=True, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({"detail": "No posts found."}, status=status.HTTP_404_NOT_FOUND)

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_like(request, post_id):
    """
    Check if the current authenticated user has liked the specified post.
    """
    try:
        # Retrieve the post by its ID
        post = get_object_or_404(Post, id=post_id)

        # Check if the user has liked the post
        is_liked = post.is_liked_by(request.user)

        # Return the response with the result
        return Response({'is_liked': is_liked}, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        member = request.user
        
        # Toggle like
        if member in post.likes.all():
            post.likes.remove(member)  # Unlike
            is_liked = False
        else:
            post.likes.add(member)  # Like
            is_liked = True
        
        post.save()
        return Response({'like_count': post.like_count(), 'is_liked': is_liked}, status=status.HTTP_200_OK)
    
    except Post.DoesNotExist:
        return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def detail_posts(request, post_id):
    """
    Retrieve the details of a specific post.
    """
    try:
        # Fetch the post by ID
        post = get_object_or_404(Post, id=post_id)

        # Serialize the post data
        serializer = PostSerializer(post, context={'request': request})

        # Include additional fields (like count, is_liked) if needed
        post_data = serializer.data
        post_data['like_count'] = post.like_count()  # Total likes for the post

        # Check if the current user has liked the post (if authenticated)
        if request.user.is_authenticated:
            post_data['is_liked'] = post.is_liked_by(request.user)  # Check if the user liked the post
        else:
            post_data['is_liked'] = False

        return Response(post_data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

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

        print(member_type, phone, email, password, r_password)

        try:
            # Set a default username depending on member type
            if member_type == "individual":
                print(f"Creating individual user")
                name = request.data.get("uname")
                user = Member.objects.create_user(username=name, email=email, password=password)
                print(name, email )
                user.is_individual = True
                user.save()
                print(f"Individual user created with ID: {user.id}")

                # Create Individual profile and link to user
                individual_profile = Individual.objects.create(name=user, phone=phone, email=email)
                print(phone, email )
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

                # Create Organization profile and link to user
                organization_profile = Organization.objects.create(name=user, tax_num=tax, phone=phone, email=email)
                organization_profile.save()
                print(f"Organization profile created with ID: {organization_profile.id}")

            # Serialize the user and return the response
            user_serializer = MemberSerializer(user)
            return Response({'message': 'Signup successful!', 'user': user_serializer.data}, status=201)

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
        if user.is_individual or user.is_organization:  # Assuming these are valid attributes
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            # Adjust token lifetime if "remember_me" is checked
            if remember_me:
                refresh.set_exp(lifetime=timedelta(days=7))  # Extend token lifetime

            return Response({
                'success': True,
                'message': 'Login successful.',
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                'username': user.username,
                'email': user.email,
                }   
            })
        else:
            return Response({'success': False, 'message': 'This user is not authorized to log in.'}, status=403)
    else:
        return Response({'success': False, 'message': 'Login failed. User does not exist.'}, status=400)

@csrf_exempt
def google_login(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            token = body.get('token')

            if not token:
                return JsonResponse({'success': False, 'message': 'Token not provided.'}, status=400)

            # Verify the token
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )

            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            

            # Extract user information
            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            name = last_name + ' ' + first_name
            print(f"User: {name}")

            # Check if the user already exists by email
            user = Member.objects.filter(email=email).first()

            if user:
                # If the user exists, log them in
                refresh = RefreshToken.for_user(user)
                return JsonResponse({
                    'success': True,
                    'message': 'Google login successful.',
                    'token': token,
                    'email': email,
                    'username': user.username,
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                })
            else:
                # If the user does not exist, create a new one
                user = Member.objects.create_user(
                    username=name, email=email, first_name=first_name, last_name=last_name
                )
                user.is_individual = True
                user.save()
                individual_profile = Individual.objects.create(name=user, email=email)
                individual_profile.save()

                # Log in the newly created user
                refresh = RefreshToken.for_user(user)

            return JsonResponse({
                'success': True,
                'message': 'Google login successful.',
                'token': token,
                'email': email,
                'username': user.username,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })

        except ValueError as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)
        except Exception as e:
            return JsonResponse({'success': False, 'message': f"An unexpected error occurred: {str(e)}"}, status=500)

    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=405)


@api_view(['POST'])
def Logout(request):
    refresh_token = request.data.get('refresh')
    if not refresh_token:
            return Response({'success': False, 'message': 'Refresh token is required.'}, status=400)

    try:
            # Log out the user (this will remove session information)
            logout(request)

            # Handle the refresh token to blacklist it
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the token

            return Response({'success': True, 'message': 'Logged out successfully.'})
    except Exception as e:
            return Response({'success': False, 'message': 'Invalid token or logout failed.'}, status=400)
    
class UserView(APIView):
    def get(self, request, *args, **kwargs):
        """
        Returns the current authenticated user's information
        """
        user = request.user  # The user is available in the request object after authentication
        # You can customize the response to include only necessary user data
        user_data = {
            'username': user.username,
            'email': user.email,
            # Add any other fields you need here
        }
        return Response(user_data, status=status.HTTP_200_OK)

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



