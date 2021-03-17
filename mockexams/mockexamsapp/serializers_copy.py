from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

class accompanySerializer(serializers.Serializer):
	acom_type = serializers.CharField()
	passage = serializers.TextField()
	diagram = serializers.ImageField()

class questionSerializer(serializers.Serializer):
	question = serializers.TextField()
	option_A = serializers.TextField()
	option_B = serializers.TextField()
	option_C = serializers.TextField()
	option_D = serializers.TextField()
	option_E = serializers.TextField()
	correct_ans = serializers.TextField()
	explain = serializers.TextField()
	subject = serializers.CharField(max_length = 100)
	year = serializers.CharField(max_length = 100)
	acom_type = serializers.CharField()
	accompany = serializers.ForeignKey(Accompany)


questions = questionSerializer(question)
question_json = JSONRenderer().render(questions.data)

accompany = accompanySerializer(question)
accompany_json = JSONRenderer().render(accompany.data)