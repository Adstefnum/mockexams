from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from mockexamsapp.models import *
from mockexamsapp.serializers import *

@csrf_exempt
def questions_list(request):
    """
        List all questions or add new questions
    """

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
def questions_list_by_subject(request,subject):
    """
        List all questions or add new questions by subject
    """

    if request.method == 'GET':
        questions = Question.objects.all(subject=subject)
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
        questions = Question.objects.all(year=year)
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
        questions = Question.objects.all(fk=fk)
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
        questions = Question.objects.all(fk=fk)
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
        question = Question.objects.get(pk=pk)

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
