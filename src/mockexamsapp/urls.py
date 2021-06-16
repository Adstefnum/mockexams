from django.contrib import admin
from django.urls import path, include
from mockexamsapp import views

app_name = "mockexamsapp"
urlpatterns = [
	path('', views.IndexView().home, name = "index"),
	path('Register', views.IndexView().signup, name = "index")
]