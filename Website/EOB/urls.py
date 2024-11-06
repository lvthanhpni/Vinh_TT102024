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
    #Signup
    path('EOB/Member', views.Signup_mem, name='Signup_mem'),
    path('EOB/VLXD', views.Signup_VLXD, name='Signup_VLXD'),
    #Login and Logout
    path('EOB/Login', views.Login, name='Login'),
    path('EOB/Logout', views.Logout, name='Logout'),
    #Forget password  
    path('EOB/Forget', views.Forget_pass, name='Forget_pass'),
    path('password_reset/', auth_views.PasswordResetView.as_view(template_name='password_reset_form.html'), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('password_reset_confirm/uidb64/token/',auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'), name='password_reset_complete'),
    #Profile
    path('EOB/Profile', views.Profile, name='Profile'),
    #Library
    path('EOB/Folder', views.Folder, name='Folder'),
    path('EOB/Library', views.Library, name='Library'),


    path('EOB/Test', views.Test, name='Test'),

    path('', include(router.urls)),

]