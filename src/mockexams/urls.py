from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('mockexamsapp.urls')),
    path('questions/v1/', include('questions_api.urls')),
    path('users/v1/', include('user_auth_api.urls')),
     path('api-auth/', include('rest_framework.urls')),
]
