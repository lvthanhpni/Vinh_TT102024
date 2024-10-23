from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Member

class MemberCreationForm(UserCreationForm):
    class Meta:
        model = Member
        fields = ('username', 'email', 'is_individual', 'is_organization', 'is_vlxd')
