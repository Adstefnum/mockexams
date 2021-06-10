from django.contrib import admin
from django.urls import path
from questions_api import views


urlpatterns = [
    path('question_list/',views.questions_list, name='question_list' ),
    path('question_list/<int:year>/',views.questions_list_by_year, name='question_list_by_year' ),
    path('question_list/<str:subject>/',views.questions_list_by_subject, name='question_list_by_subject' ),
    path('question_list/<int:pk>/',views.question_detail, name='question_detail' ),
    path('question_list/<str:acom_type>/',views.questions_list_by_acom_type, name='question_list_by_acom_type' ),
    path('question_list/<int:accompany_id>/',views.questions_list_by_acom_type, name='question_list_by_accompaniment' ),
]
