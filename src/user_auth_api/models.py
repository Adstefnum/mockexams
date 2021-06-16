from django.db import models
from django.contrib.auth.models import User


SUB_CHOICES = (
	("ENG", "English"),
	("MATH", "Mathematics"),
	("PHY", "Physics"),
	("GEO", "Geography"),
	("BIO", "Biology"),
	
	)

EXAM_TYPE = (

	("UTME", "Jamb Examination"),
	("POST-UTME", 'Post Jamb Examination'),
)


class userProfile(models.Model):
	user = models.OneToOneField(User,on_delete=models.CASCADE)
	uuid = models.CharField(max_length=16)
	phone = models.CharField(max_length=16)
	image = models.ImageField(upload_to='media/profile_pics/')

class userRecord(models.Model):
	subject = models.CharField(max_length = 100,choices= SUB_CHOICES, default ="English")
	exam_type = models.CharField(max_length = 100,choices= EXAM_TYPE,null=True)
	score = models.IntegerField(default=0)
	taken_at  = models.DateTimeField(auto_now_add=True, blank=True)

