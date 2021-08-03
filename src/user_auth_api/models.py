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


from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
import uuid

class UserManager(BaseUserManager):

  def _create_user(self,user_name,email, current_jamb_score,phone_num,password,last_name,first_name, is_staff, is_superuser, **extra_fields):
    if not email and phone_num and first_name and last_name and user_name:
        raise ValueError('Users must have all specified fields')
    now = timezone.now()
    email = self.normalize_email(email)
    user = self.model(
         user_name=user_name,
        email=email,
        current_jamb_score = current_jamb_score,
        phone_num=phone_num,
        last_name=last_name,
        first_name = first_name,
        is_staff=is_staff, 
        is_active=True,
        is_superuser=is_superuser, 
        last_login=now,
        date_joined=now, 
        **extra_fields
    )
    user.set_password(password)
    user.save(using=self._db)
    return user

  def  create_user(self,user_name,email, current_jamb_score,phone_num,password,last_name,first_name, is_staff, is_superuser, **extra_fields):
    return self._create_user(user_name,email, current_jamb_score,phone_num,password,last_name,first_name, is_staff, is_superuser, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=254, unique=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user_name = models.CharField(max_length=254,null=False, blank=False, unique=True,default=None)
    first_name = models.CharField(max_length=254, null=False, blank=False)
    last_name = models.CharField(max_length=254,null=False, blank=False)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone_num = models.CharField(validators=[phone_regex], max_length=17,null=False, blank=False, unique=True) # validators should be a list
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    current_jamb_score = models.IntegerField(default=0)

    

    USERNAME_FIELD = 'user_name'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_absolute_url(self):
        return "/users/%i/" % (self.uuid)


class userRecord(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None)
    subject = models.CharField(max_length = 100,choices= SUB_CHOICES, default ="English")
    exam_type = models.CharField(max_length = 100,choices= EXAM_TYPE,null=True)
    score = models.IntegerField(default=0)
    taken_at  = models.DateTimeField(auto_now_add=True, blank=True)

