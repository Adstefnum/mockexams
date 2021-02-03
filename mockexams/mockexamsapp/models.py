from django.db import models


SUB_CHOICES = (
	("ENG", "English"),
	("MATH", "Mathematics"),
	("PHY", "Physics"),
	("GEO", "Geography"),
	("BIO", "Biology"),
	
	)

YEAR_CHOICES =  [(str(i), i) for i in range(1990,2022)]

ACC_TYPE = (
				("PASS", "Passage"),
				("DIG", "Diagram"),
	)

class Accompany(models.Model):
	acom_type = models.CharField(max_length = 100, choices= ACC_TYPE)
	passage = models.TextField()
	diagram = models.ImageField(upload_to ='media/images/', default =None )


class Question(models.Model):
	question = models.TextField()
	option_A = models.TextField()
	option_B = models.TextField()
	option_C = models.TextField()
	option_D = models.TextField()
	option_E = models.TextField(null=True) # can be null
	correct_ans = models.TextField()
	explain = models.TextField(null=True)

	subject = models.CharField(max_length = 100,choices= SUB_CHOICES)
	year = models.CharField(max_length = 100,choices= YEAR_CHOICES)
	acom_type = models.CharField(max_length = 100,choices= ACC_TYPE)
	accompany = models.ForeignKey(Accompany, on_delete=models.CASCADE,null=True)


