from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from mockexamsapp.models import *

class accompanySerializer(serializers.ModelSerializer):
	class Meta:
		model = Accompany
		fields = "__all__"

class questionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Question
		fields = "__all__"


questions = questionSerializer(question)
question_json = JSONRenderer().render(questions.data)

accompany = accompanySerializer(question)
accompany_json = JSONRenderer().render(accompany.data)