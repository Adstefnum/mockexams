from .env import *

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = BASE_DIR


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = SECRET_KEY

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = DEBUG

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = INSTALLED_APPS

MIDDLEWARE = MIDDLEWARE

ROOT_URLCONF = ROOT_URLCONF

TEMPLATES = TEMPLATES

WSGI_APPLICATION =  WSGI_APPLICATION


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = DATABASES

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = AUTH_PASSWORD_VALIDATORS

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = LANGUAGE_CODE

TIME_ZONE = TIME_ZONE

USE_I18N = USE_I18N

USE_L10N = USE_L10N

USE_TZ = USE_TZ


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = STATIC_URL
MEDIA_ROOT =  MEDIA_ROOT
MEDIA_URL = MEDIA_URL
