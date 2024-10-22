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
        check = request.POST.get("checkbox", False)
        name = request.POST.get("uname")
        phone = request.POST.get("phone")
        email = request.POST.get("email")
        password = request.POST.get("pass")
        r_password = request.POST.get("rpass")
        check_user = Member.objects.filter(username=name).exists()

        # Create the user
        user = Member.objects.create_user(username=name, password=password)
        user.is_individual = True
        user.save()
        
        # Create the Individual profile
        jf = Individual.objects.create(user=user, email=email)
        jf.phone = phone
        jf.save()

        return redirect('EOB/Carousel')  # Redirect to Carousel.html after successful signup

    return render(request, 'Signup_mem.html')



def Signup_VLXD(request):
  return render(request, 'Signup_VLXD.html')

def Login(request):
    if request.method == "POST":
        uname = request.POST.get("uname")
        password = request.POST.get("pass")
        check = request.POST.get("checkbox", False)
        user = authenticate(request, username=uname, password=password)

        if user is not None:
            login(request, user)  # Log the user in
            response = redirect('Carousel')  # Redirect to Carousel.html
            if check:  # If 'Remember Me' checkbox is checked
                response.set_cookie('uname', uname, max_age=30*24*60*60)  # Set username cookie for 30 days
                response.set_cookie('password', password, max_age=30*24*60*60)  # Set password cookie for 30 days
            return response
        else:
            messages.error(request, "Fail Login. User not existed")
    
    return render(request, 'Login.html')

def Logout(request):
    logout(request)
    return render(request, 'Homepage.html')
    
    