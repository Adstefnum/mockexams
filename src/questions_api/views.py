from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import generics
from questions_api.models import *
from questions_api.serializers import *
import random



def questions_api(request):
    
    if request.method == 'GET':
        subject = request.GET.get("sub","all")
        year = request.GET.get("year","all")
        exam_type = request.GET.get("exam","all")
        acom_type = request.GET.get("acom","all")
        rand = request.GET.get("rand","all")
        number = int(request.GET.get("num","10"))

        questions = list(Question.objects.filter(
                subject=subject,
                year = year,
                exam_type=exam_type,
                acom_type=acom_type

            ))# returns empty list if other args are empty


        if rand:
           questions = random.sample(questions, number)

        question_serializer = questionSerializer(questions, many=True)
        return JsonResponse(question_serializer.data, safe=False)




def filter_questions(**args):

    if sub:
        pass









'''def questions_api(request, **kwargs):

    if request.method == 'GET':
        questions = Question.objects.all()
        question_serializer = questionSerializer(questions, many=True)
        return JsonResponse(question_serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = questionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)



@csrf_exempt
def questions_list(request):
    """
        List all questions or add new questions
    """
    return questions_api(request)




@csrf_exempt
def questions_list_by_subject(request,subject):
    """
        List all questions or add new questions by subject
    """

    if request.method == 'GET':
        questions = Question.objects.filter(subject=subject)
        question_serializer = questionSerializer(questions, many=True)
        return JsonResponse(question_serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = questionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def questions_list_by_year(request,year):
    """
        List all questions or add new questions by year
    """

    if request.method == 'GET':
        questions = Question.objects.filter(year=year)
        question_serializer = questionSerializer(questions, many=True)
        return JsonResponse(question_serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = questionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def questions_list_by_accompaniment(request,fk):
    """
        List all questions or add new questions by accompaniment
    """

    if request.method == 'GET':
        questions = Question.objects.filter(fk=fk)
        question_serializer = questionSerializer(questions, many=True)
        return JsonResponse(question_serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = questionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def questions_list_by_acom_type(request,fk):
    """
        List all questions by accompaniment type
    """

    if request.method == 'GET':
        questions = Question.objects.filter(fk=fk)
        question_serializer = questionSerializer(questions, many=True)
        return JsonResponse(question_serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = questionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def question_detail(request,pk):

    """
        Retrive, update, or delete a question
    """

    try:
        question = Question.objects.filter(pk=pk)

    except Exception: 
        return HttpResponse(status=404)

    if request.method == 'GET':
        question_serializer = questionSerializer(question)
        return JsonResponse(question_serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = questionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        question.delete()
        return HttpResponse(status=204)
'''