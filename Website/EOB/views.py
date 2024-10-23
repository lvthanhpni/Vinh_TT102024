from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib import messages
from EOB.models import Member, Individual, Organization, VLXD



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

        # Create the user based on member type
        if member_type == "individual":
            name = request.POST.get("uname")
            if Member.objects.filter(username=name).exists():
                messages.error(request, 'Username existed, please choose another username')
                return render(request, 'Signup_mem.html')

            user = Member.objects.create_user(username=name, password=password)
            user.is_individual = True
            user.save()

            # Create the Individual profile
            Indv = Individual.objects.create(full_name=user, phone=phone, email=email)
            Indv.save()

        elif member_type == "organization":
            name = request.POST.get("c_name")
            tax = request.POST.get("tax")
            if Member.objects.filter(username=name).exists():
                messages.error(request, 'Username existed, please choose another username')
                return render(request, 'Signup_mem.html')

            user = Member.objects.create_user(username=name, password=password)
            user.is_organization = True
            user.save()

            # Create the Organization profile
            Org = Organization.objects.create(c_name=user, tax_num=tax, phone=phone, email=email)
            Org.save()

        return redirect('/EOB/Carousel')  # Redirect to Carousel.html after successful signup

    return render(request, 'Signup_mem.html')


def Signup_VLXD(request):
    if request.method == "POST":
        check = request.POST.get("checkbox", False)
        name = request.POST.get("cname")
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        job = request.POST.get("job")

        # Create the user
        user = Member.objects.create_user(username=name, password='temporarypassword')
        user.is_vlxd = True
        user.save()

        # Create the VLXD profile
        VLXD_User = VLXD.objects.create(c_name=user, phone=phone, email=email, job=job)
        VLXD_User.save()

        return redirect('/EOB/Carousel')  # Redirect to Carousel.html after successful signup

    return render(request, 'Signup_VLXD.html' )

def Login(request):
    if request.method == "POST":
        uname = request.POST.get("uname")
        password = request.POST.get("pass")
        check = request.POST.get("checkbox", False)
        user = authenticate(request, username=uname, password=password)

        if user is not None:
            if isinstance(user, Member) and (user.is_individual or user.is_organization):
                login(request, user)  # Log the user in
                response = redirect('Carousel')  # Redirect to Carousel.html
                if check:  # If 'Remember Me' checkbox is checked
                    response.set_cookie('uname', uname, max_age=30*24*60*60)  # Set username cookie for 30 days
                    response.set_cookie('password', password, max_age=30*24*60*60)  # Set password cookie for 30 days
                return response
            else:
                messages.error(request, "This user is not authorized to log in.")
        else:
            messages.error(request, "Fail Login. User not existed")
    
    return render(request, 'Login.html')

def Logout(request):
    logout(request)
    return render(request, 'Homepage.html')
    
    