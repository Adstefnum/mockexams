from django.contrib import admin
from django.urls import path
from questions_api import views


urlpatterns = [
    path('',views.questions_api, name='questions' ),
    #path('<int:year>/',views.questions_list_by_year, name='questions_by_year' ),
    #path('<str:subject>/',views.questions_list_by_subject, name='questions_by_subject' ),
    #path('<int:pk>/',views.question_detail, name='question_detail' ),
    #path('<str:acom_type>/',views.questions_list_by_acom_type, name='questions_by_acom_type' ),
    #path('<int:accompany_id>/',views.questions_list_by_acom_type, name='questions_by_accompaniment' ),
]
