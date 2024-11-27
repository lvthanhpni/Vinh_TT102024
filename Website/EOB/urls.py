from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

from rest_framework.routers import DefaultRouter
from .views import MemberViewSet, IndividualViewSet, OrganizationViewSet, VLXDViewSet, TokenListView


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
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
    path('api/logout', views.Logout, name='logout'),  
    path('api/user', views.UserView.as_view(), name='user'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # Verify token
    path('api/token/list', TokenListView.as_view(), name='token_list'),

    path('api/google-login', views.google_login, name='google-login'),
]