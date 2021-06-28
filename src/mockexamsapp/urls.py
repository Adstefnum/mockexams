from django.contrib import admin
from django.urls import path, include
from mockexamsapp import views

app_name = "mockexamsapp"
urlpatterns = [
	path('', views.IndexView().home, name = "home"),
	path('terms', views.IndexView().note, name = "terms"),
	path('policy', views.IndexView().note, name = "policy"),
	path('devs', views.IndexView().note, name = "developers"),
	path('faq', views.IndexView().note, name = "faq"),
	path('cbt', views.IndexView().cbt, name = "cbt")
]