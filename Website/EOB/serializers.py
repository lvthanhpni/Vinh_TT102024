from rest_framework import serializers
from .models import Member, Individual, Organization, VLXD

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class IndividualSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='full_name.id')
    full_name = serializers.CharField(source='full_name.username')

    class Meta:
        model = Individual
        fields = ['id', 'full_name', 'phone', 'email']


class OrganizationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='c_name.id')
    company_name = serializers.CharField(source='c_name.username')  # Changed from full_name to company_name

    class Meta:
        model = Organization
        fields = ['id', 'company_name', 'tax_num', 'phone', 'email']


class VLXDSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='c_name.id')
    company_name = serializers.CharField(source='c_name.username')  # Changed from full_name to company_name

    class Meta:
        model = VLXD
        fields = ['id', 'company_name', 'phone', 'email', 'job']

