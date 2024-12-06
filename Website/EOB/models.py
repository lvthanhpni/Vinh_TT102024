from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.conf import settings  # To reference the custom Member model

# Member model
class Member(AbstractUser):
    is_individual = models.BooleanField(default=False)
    is_organization = models.BooleanField(default=False)
    is_vlxd = models.BooleanField(default=False)

    rank = models.PositiveIntegerField(
        default=1,
        choices=[
            (1, 'Star'),
            (2, 'Pro'),
            (3, 'VIP'),
        ]
    )

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

    def clean(self):
        # Ensure only one member type is True
        types_selected = sum([self.is_individual, self.is_organization, self.is_vlxd])
        if types_selected > 1:
            raise ValidationError("A member can only be one of: Individual, Organization, or VLXD.")

    

# Individual model
class Individual(models.Model):
    name = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True)
    phone = models.CharField("Phone", max_length=50)
    email = models.EmailField(unique=True)  # Enforce unique email if each account should be unique

    def __str__(self):
        return f"Individual: {self.name}"

# Organization model
class Organization(models.Model):
    name = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True, verbose_name='Company Name')
    tax_num = models.CharField(max_length=10, verbose_name='Tax Number')
    phone = models.CharField("Phone", max_length=50)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"Organization: {self.name}"

# VLXD model
class VLXD(models.Model):
    name = models.OneToOneField(Member, on_delete=models.CASCADE, primary_key=True, verbose_name='Company Name')
    phone = models.CharField("Phone", max_length=50)
    email = models.EmailField(unique=True)
    job = models.CharField("Job Title", max_length=50)

    def __str__(self):
        return f"VLXD Company: {self.name}"

class Post(models.Model):
    picture = models.ImageField(
        upload_to='post_pictures/',
        blank=True,
        null=True
    )
    name = models.CharField(max_length=255, verbose_name="Posted by")
    title = models.CharField(max_length=100, verbose_name="Post Title")
    caption = models.TextField(verbose_name="Post Caption")
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="liked_posts",
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def is_liked_by(self, member):
        """
        Check if a specific member has liked this post.
        """
        if member and member.is_authenticated:
            return self.likes.filter(pk=member.pk).exists()
        return False

    def like_count(self):
        """
        Returns the total number of likes.
        """
        return self.likes.count()

    def __str__(self):
        return f"{self.title} by {self.name}"




