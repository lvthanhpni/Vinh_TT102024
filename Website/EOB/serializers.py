from rest_framework import serializers
from .models import Member, Individual, Organization, VLXD, Post
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


class IndividualSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='name.id')  # Reference to the Member's id
    name = serializers.CharField(source='name.username')  # Reference to the Member's username

    class Meta:
        model = Individual
        fields = ['id', 'name', 'phone', 'email']


class OrganizationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='name.id')  # Reference to the Member's id
    name = serializers.CharField(source='name.username')  # Reference to the Member's username

    class Meta:
        model = Organization
        fields = ['id', 'name', 'tax_num', 'phone', 'email']


class VLXDSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='name.id')  # Reference to the Member's id
    name = serializers.CharField(source='name.username')  # Reference to the Member's username

    class Meta:
        model = VLXD
        fields = ['id', 'name', 'phone', 'email', 'job']


class MemberSerializer(serializers.ModelSerializer):
    is_individual = serializers.BooleanField(read_only=True)
    is_organization = serializers.BooleanField(read_only=True)
    is_vlxd = serializers.BooleanField(read_only=True)
    rank = serializers.IntegerField()  

    name = serializers.CharField(source='individual.name')
    phone = serializers.CharField(source='individual.phone')
    email = serializers.EmailField(source='individual.email')
    
    company_name = serializers.CharField(source='organization.name')
    tax_num = serializers.CharField(source='organization.tax_num')
    organization_phone = serializers.CharField(source='organization.phone')
    organization_email = serializers.EmailField(source='organization.email')
    
    job = serializers.CharField(source='vlxd.job', read_only=True)

    class Meta:
        model = Member
        fields = ['id', 'is_individual', 'is_organization', 'is_vlxd', 'rank', 'name', 'phone', 'email', 'company_name', 'tax_num', 'organization_phone', 'organization_email', 'job']
    
    def to_representation(self, instance):
        """
        Conditionally change the fields depending on the Member type
        """
        # Call the parent method to get the initial representation
        representation = super().to_representation(instance)

        # Remove unnecessary fields based on the flags
        if instance.is_individual:
            # Keep only the individual-specific fields
            return {key: representation[key] for key in ['id', 'name', 'phone', 'email', 'rank', 'is_individual']}
        elif instance.is_organization:
            # Keep only the organization-specific fields
            return {key: representation[key] for key in ['id', 'company_name', 'tax_num', 'organization_phone', 'organization_email', 'rank', 'is_organization']}
        elif instance.is_vlxd:
            # Keep only the VLXD-specific fields
            return {key: representation[key] for key in ['id', 'name', 'phone', 'email', 'job', 'rank', 'is_vlxd']}
        
        return representation

class PostSerializer(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True)
    like_count = serializers.SerializerMethodField()  # Add like count
    is_liked = serializers.SerializerMethodField()  # Add is_liked field

    class Meta:
        model = Post
        fields = ['id', 'picture', 'name', 'title', 'caption', 'created_at', 'updated_at', 'like_count', 'is_liked']
        read_only_fields = ['id', 'created_at', 'updated_at', 'name', 'like_count', 'is_liked']

    def get_like_count(self, obj):
        """
        Get the total number of likes for the post.
        """
        return obj.like_count()

    def get_is_liked(self, obj):
        """
        Check if the current authenticated user has liked this post.
        """
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.is_liked_by(request.user)  # Checks if the current user liked the post
        return False


    def validate(self, data):
        """
        Ensure the post has a title and caption.
        """
        if not data.get('title'):
            raise serializers.ValidationError("Title is required.")
        if not data.get('caption'):
            raise serializers.ValidationError("Caption is required.")
        return data

    def create(self, validated_data):
        """
        Override the create method to set the 'name' field as the username of the member creating the post.
        """
        user = self.context['request'].user
        validated_data['name'] = user.username
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Prevent updating the 'name' field.
        """
        validated_data.pop('name', None)
        return super().update(instance, validated_data)
