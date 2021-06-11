from user_auth_api.views import RegisterAPI,LoginAPI
from django.urls import path
from knox import views as knox_views

urlpatterns = [
    path('users/register/v1/', RegisterAPI.as_view(), name='register'),
     path('users/login/v1/', LoginAPI.as_view(), name='login'),
    path('users/logout/v1/', knox_views.LogoutView.as_view(), name='logout'),
    path('users/logoutall/v1/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]