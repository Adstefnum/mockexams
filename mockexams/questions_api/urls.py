from django.contrib import admin
from django.urls import path
from questions_api import views


urlpatterns = [
    path('questions/v1/',views.questions_list, name='questions' ),
    path('questions/v1/<int:year>/',views.questions_list_by_year, name='questions_by_year' ),
    path('questions/v1/<str:subject>/',views.questions_list_by_subject, name='questions_by_subject' ),
    path('questions/v1/<int:pk>/',views.question_detail, name='question_detail' ),
    path('questions/v1/<str:acom_type>/',views.questions_list_by_acom_type, name='questions_by_acom_type' ),
    path('questions/v1/<int:accompany_id>/',views.questions_list_by_acom_type, name='questions_by_accompaniment' ),
]
