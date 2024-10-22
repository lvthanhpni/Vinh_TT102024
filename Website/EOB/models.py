from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

# Member models
class Member(AbstractUser):
    is_indivdual = models.BooleanField(default=False)
    is_organization = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='member_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='member_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )
    
class Individual(models.Model):
    full_name=models.OneToOneField(Member,on_delete=models.CASCADE, primary_key=True)
    phone=models.CharField((""), max_length=50)
    email=models.EmailField()   

class Organization(models.Model):
    c_name=models.OneToOneField(Member,on_delete=models.CASCADE, primary_key=True)
    tax_num=models.CharField(max_length=10)
    phone=models.CharField((""), max_length=50)
    email=models.EmailField() 

# VLXD models
class VLXD(models.Model):
    c_name=models.OneToOneField(Member,on_delete=models.CASCADE, primary_key=True)
    phone=models.CharField((""), max_length=50)
    email=models.EmailField() 
    Job=models.CharField(max_length=50)