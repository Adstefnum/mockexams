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
        questions = Question.objects.all
        question_serializer = questionSerializer(questions, many=True)
        return JsonResponse(question_serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = questionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
