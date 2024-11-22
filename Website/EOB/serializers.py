# serializers.py
from rest_framework import serializers
from .models import Member, Individual, Organization, VLXD
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


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


class MemberSerializer(serializers.ModelSerializer):
    is_individual = serializers.BooleanField(read_only=True)
    is_organization = serializers.BooleanField(read_only=True)
    is_vlxd = serializers.BooleanField(read_only=True)
    
    full_name = serializers.CharField(source='individual.full_name', read_only=True)
    phone = serializers.CharField(source='individual.phone', read_only=True)
    email = serializers.EmailField(source='individual.email', read_only=True)
    
    company_name = serializers.CharField(source='organization.c_name', read_only=True)
    tax_num = serializers.CharField(source='organization.tax_num', read_only=True)
    
    job = serializers.CharField(source='vlxd.job', read_only=True)

    class Meta:
        model = Member
        fields = ['id', 'is_individual', 'is_organization', 'is_vlxd', 'full_name', 'phone', 'email', 'company_name', 'tax_num', 'job']
    
    def to_representation(self, instance):
        """
        Conditionally change the fields depending on the Member type
        """
        # Call the parent method to get the initial representation
        representation = super().to_representation(instance)

        # Remove unnecessary fields based on the flags
        if instance.is_individual:
            # Keep only the individual-specific fields
            return {key: representation[key] for key in ['id', 'full_name', 'phone', 'email', 'is_individual']}
        elif instance.is_organization:
            # Keep only the organization-specific fields
            return {key: representation[key] for key in ['id', 'company_name', 'tax_num', 'phone', 'email', 'is_organization']}
        elif instance.is_vlxd:
            # Keep only the VLXD-specific fields
            return {key: representation[key] for key in ['id', 'company_name', 'phone', 'email', 'job', 'is_vlxd']}
        
        return representation