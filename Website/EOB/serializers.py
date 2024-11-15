# serializers.py
from rest_framework import serializers
from .models import Member, Individual, Organization, VLXD
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

# Existing serializers
class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class IndividualSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='full_name.id')  # Reference to the Member's id
    full_name = serializers.CharField(source='full_name.username')  # Reference to the Member's username

    class Meta:
        model = Individual
        fields = ['id', 'full_name', 'phone', 'email']

class OrganizationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='c_name.id')  # Reference to the Member's id
    company_name = serializers.CharField(source='c_name.username')  # Reference to the Member's username

    class Meta:
        model = Organization
        fields = ['id', 'company_name', 'tax_num', 'phone', 'email']

class VLXDSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='c_name.id')  # Reference to the Member's id
    company_name = serializers.CharField(source='c_name.username')  # Reference to the Member's username

    class Meta:
        model = VLXD
        fields = ['id', 'company_name', 'phone', 'email', 'job']

# New UserSerializer for login (authentication)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member  # Directly reference the Member model as the user model
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}  # Make password write-only

# New SignupSerializer for registration
class SignupSerializer(serializers.Serializer):
    member_type = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    pass1 = serializers.CharField(write_only=True, required=True)
    pass2 = serializers.CharField(write_only=True, required=True)
    uname = serializers.CharField(allow_blank=True)
    c_name = serializers.CharField(allow_blank=True)
    tax = serializers.CharField(allow_blank=True)

    def validate(self, data):
        # Check if passwords match
        if data.get("pass1") != data.get("pass2"):
            raise serializers.ValidationError("Passwords do not match.")
        
        # Validate password strength using Django's password validators
        try:
            validate_password(data.get("pass1"))
        except ValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        
        return data
