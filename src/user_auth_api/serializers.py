from rest_framework import serializers
from user_auth_api.models import User

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [

        'user_name',
        'email',
        'current_jamb_score',
        'phone_num',
        'last_name',
        'first_name',
        'is_staff',
        'is_superuser',
        'uuid',
        'is_active',
        'last_login',
        'date_joined',

]

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['user_name'],
            validated_data['email'],validated_data['current_jamb_score'],
             validated_data['phone_num'],validated_data['password'],
            validated_data['last_name'],validated_data['first_name'],
            validated_data['is_staff'],validated_data['is_superuser']


            )

        return user