from rest_framework import generics, permissions
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.models import AuthToken
from user_auth_api.serializers import UserSerializer, RegisterSerializer
from django.contrib.auth import login
from user_auth_api.models import User




def user_detail(request,uuid):
    try:
        user = User.objects.filter(uuid=uuid)

    except Exception: 
        return HttpResponse(status=404)

    if request.method == 'GET':
        user_serializer = UserSerializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })



#Login API
class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        temp_list = super(LoginAPI, self).post(request, format=None)
        return_fields = [f.name for f in User._meta.fields]
        return_fields.remove("password")
        return_fields.remove("id")

        for i in return_fields:
            temp_list.data[i] = getattr(user,i)
        return Response({"data":temp_list.data})
