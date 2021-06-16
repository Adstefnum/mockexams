from django.db import models
from django.contrib.auth.models import User

class userProfile(models.Model):
	user = models.OneToOneField(User,on_delete=models.CASCADE)
	uuid = models.CharField(max_length=16)
	phone = models.CharField(max_length=16)
	image = models.ImageField(upload_to='media/profile_pics/')

class userRecord(models.Model):
	pass

