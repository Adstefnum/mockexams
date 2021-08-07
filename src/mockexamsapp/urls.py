from django.contrib import admin
from django.urls import path, include
from mockexamsapp import views

app_name = "mockexamsapp"
urlpatterns = [
	path('', views.IndexView().home, name = "home"),
	path('user/<str:userid>/', views.IndexView().user, name = "user"),
	path('exam/<str:examid>/<str:userid>/', views.IndexView().exam, name = "exam"),
	path('terms', views.IndexView().note, name = "terms"),
	path('policy', views.IndexView().note, name = "policy"),
	path('devs', views.IndexView().note, name = "developers"),
	path('faq', views.IndexView().note, name = "faq"),
	path('payment', views.IndexView().payment, name = "payment"),
	#path('payment', views.subscribe_view, name = "payment"),

]