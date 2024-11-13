from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

from rest_framework.routers import DefaultRouter
from .views import MemberViewSet, IndividualViewSet, OrganizationViewSet, VLXDViewSet

router = DefaultRouter()
router.register(r'members', MemberViewSet)
router.register(r'individuals', IndividualViewSet)
router.register(r'organizations', OrganizationViewSet)
router.register(r'vlxd', VLXDViewSet)

urlpatterns = [
    path('', views.Base, name='Base'),
    path('EOB/', views.Homepage, name='Homepage'),
    path('EOB/Carousel', views.Carousel, name='Carousel'),

    #Login and Logout
    path('EOB/Login', views.Login, name='Login'),
    path('EOB/Logout', views.Logout, name='Logout'),

    #Forget password  
    path('EOB/Forget', views.Forget_pass, name='Forget_pass'),

    #Profile
    path('EOB/Profile', views.Profile, name='Profile'),
    #Library
    path('EOB/Folder', views.Folder, name='Folder'),
    path('EOB/Library', views.Library, name='Library'),


    path('EOB/Test', views.Test, name='Test'),

    path('', include(router.urls)),
    path('api/signup_vlxd', views.Signup_VLXD, name='signup_vlxd'),
    path('api/signup_mem', views.Signup_mem, name='signup_mem'),

]