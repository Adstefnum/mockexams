from django.contrib import admin
from django.urls import path,include
from mockexamsapp import views

app_name = "mockexamsapp"
urlpatterns = [

	path('',views.IndexView.as_view(),name = "index"),

]