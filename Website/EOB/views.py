# Django imports
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect
from django.contrib import messages

# Django REST Framework imports
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# Model imports
from EOB.models import Member, Individual, Organization, VLXD

# Serializer imports
from .serializers import MemberSerializer, IndividualSerializer, OrganizationSerializer, VLXDSerializer

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



# Regular Django views
def Test(request):
    return render(request, 'Test.html')


def Base(request):
    return render(request, 'Base.html')


def Homepage(request):
    return render(request, 'Homepage.html')


def Carousel(request):
    return render(request, 'Carousel.html')


def Signup_mem(request):
    if request.method == "POST":
        member_type = request.POST.get("member_type")
        check = request.POST.get("checkbox", False)
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        password = request.POST.get("pass")
        r_password = request.POST.get("rpass")

        # Validate password match
        if password != r_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'Signup_mem.html')

        # Check for existing username and email
        if Member.objects.filter(username=request.POST.get("uname" if member_type == "individual" else "c_name")).exists():
            messages.error(request, 'Username exists, please choose another.')
            return render(request, 'Signup_mem.html')

        if Member.objects.filter(email=email).exists():
            messages.error(request, 'Email already exists, please use a different email.')
            return render(request, 'Signup_mem.html')

        # Create user based on member type
        if member_type == "individual":
            name = request.POST.get("uname")
            user = Member.objects.create_user(username=name, email=email, password=password)
            user.is_individual = True
            user.save()

            # Create Individual profile
            Individual.objects.create(full_name=user, phone=phone, email=email)

        elif member_type == "organization":
            name = request.POST.get("c_name")
            tax = request.POST.get("tax")
            user = Member.objects.create_user(username=name, email=email, password=password)
            user.is_organization = True
            user.save()

            # Create Organization profile
            Organization.objects.create(c_name=user, tax_num=tax, phone=phone, email=email)

        return redirect('Carousel')  # Use named URL if defined in urls.py

    return render(request, 'Signup_mem.html')


def Signup_VLXD(request):
    if request.method == "POST":
        check = request.POST.get("checkbox", False)
        name = request.POST.get("cname")
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        job = request.POST.get("job")

        # Check if username or email already exists
        if Member.objects.filter(username=name).exists():
            messages.error(request, "Username already exists. Please choose a different username.")
            return render(request, 'Signup_VLXD.html')

        if Member.objects.filter(email=email).exists():
            messages.error(request, "Email already exists. Please use a different email.")
            return render(request, 'Signup_VLXD.html')

        # Create user with email field
        user = Member.objects.create_user(username=name, password='temporarypassword', email=email)
        user.is_vlxd = True
        user.save()

        # Create VLXD profile
        VLXD_User = VLXD.objects.create(c_name=user, phone=phone, email=email, job=job)
        VLXD_User.save()

        return redirect('Carousel')  # Use named URL if defined in urls.py

    return render(request, 'Signup_VLXD.html')


def Login(request):
    if request.method == "POST":
        uname = request.POST.get("uname")
        password = request.POST.get("pass")
        check = request.POST.get("checkbox", False)
        user = authenticate(request, username=uname, password=password)

        if user is not None:
            if isinstance(user, Member) and (user.is_individual or user.is_organization):
                login(request, user)
                response = redirect('Carousel')  # Redirect to Carousel.html
                if check:  # Set 'Remember Me' cookie
                    response.set_cookie('uname', uname, max_age=30*24*60*60)  # 30 days
                    response.set_cookie('password', password, max_age=30*24*60*60)
                return response
            else:
                messages.error(request, "This user is not authorized to log in.")
        else:
            messages.error(request, "Login failed. User does not exist.")

    return render(request, 'Login.html')


def Logout(request):
    logout(request)
    return render(request, 'Homepage.html')


def Forget_pass(request):
    return render(request, 'Forget_pass.html')


def Profile(request):
    return render(request, 'Profile.html')


def Folder(request):
    return render(request, 'Folder.html')


def Library(request):
    return render(request, 'Library.html')
