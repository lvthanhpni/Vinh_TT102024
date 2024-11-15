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

    path('', include(router.urls)),
    path('api/signup_vlxd', views.Signup_VLXD, name='signup_vlxd'),
    path('api/signup_mem', views.Signup_mem, name='signup_mem'),
    path('api/login', views.Login, name='login'),

]