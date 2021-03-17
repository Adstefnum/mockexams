from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from models import *

class accompanySerializer(serializers.ModelSerializer):
	model = "Accompany"
	fields = "__all__"

class questionSerializer(serializers.ModelSerializer):
	model = "Question"
	fields = "__all__"


questions = questionSerializer(question)
question_json = JSONRenderer().render(questions.data)

accompany = accompanySerializer(question)
accompany_json = JSONRenderer().render(accompany.data)