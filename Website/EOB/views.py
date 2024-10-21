from django.http import HttpResponse
from django.template import loader
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect

def Base(request):
  template = loader.get_template('Base.html')
  return HttpResponse(template.render())

def Homepage(request):
  template = loader.get_template('Homepage.html')
  return HttpResponse(template.render())

def Carousel(request):
  template = loader.get_template('Carousel.html')
  return HttpResponse(template.render())

def Signup_mem(request):
  template = loader.get_template('Signup_mem.html')
  return HttpResponse(template.render())

def Signup_VLXD(request):
  template = loader.get_template('Signup_VLXD.html')
  return HttpResponse(template.render())

def Login(request):
  template = loader.get_template('Login.html')
  return HttpResponse(template.render())

def Login(request):
    if request.method == "POST":
        uname = request.POST.get("uname")
        password = request.POST.get("pass")

        user = authenticate(request, username=uname, password=password)
        if user is not None:
            return redirect('Carousel')  # Redirect to Carousel.html

    return render(request, 'Login.html')