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


