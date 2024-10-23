from django.db import models
from django.contrib.auth.models import AbstractUser

# Member models
class Member(AbstractUser):
    is_individual = models.BooleanField(default=False)
    is_organization = models.BooleanField(default=False)
    is_vlxd = models.BooleanField(default=False)

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
    full_name = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True)
    phone = models.CharField("Phone", max_length=50)
    email = models.EmailField()

class Organization(models.Model):
    c_name = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True, verbose_name = 'Company Name')
    tax_num = models.CharField(max_length=10, verbose_name = 'Tax Number')
    phone = models.CharField("Phone", max_length=50)
    email = models.EmailField()

class VLXD(models.Model):
    c_name = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True, verbose_name = 'Company Name'  )
    phone = models.CharField("Phone", max_length=50)
    email = models.EmailField()
    job = models.CharField(max_length=50)
