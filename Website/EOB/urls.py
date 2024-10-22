from django.urls import path
from . import views

urlpatterns = [
    path('', views.Base, name='Base'),
    path('EOB/', views.Homepage, name='Homepage'),
    path('EOB/Carousel', views.Carousel, name='Carousel'),
    path('EOB/Member', views.Signup_mem, name='Signup_mem'),
    path('EOB/Idv', views.Signup_idv, name='Signup_idv'),
    path('EOB/Org', views.Signup_org, name='Signup_org'),
    path('EOB/VLXD', views.Signup_VLXD, name='Signup_VLXD'),
    path('EOB/Login', views.Login, name='Login'),
    path('EOB/Logout', views.Logout, name='Logout'),
    path('EOB/Test', views.Test, name='Test'),
]