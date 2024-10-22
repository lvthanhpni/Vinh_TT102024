from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib import messages
from EOB.models import Individual, Organization, VLXD

def Test(request):
  return render(request, 'Test.html')

def Base(request):
  return render(request, 'Base.html')

def Homepage(request):
  return render(request, 'Homepage.html')

def Carousel(request):
  return render(request, 'Carousel.html')

def Signup_mem(request):
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