from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mockexamsapp.urls')),
    path('', include('questions_api.urls')),
    path('', include('user_auth_api.urls')),
]
