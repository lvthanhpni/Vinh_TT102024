# Generated by Django 5.1.2 on 2024-12-25 03:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EOB', '0025_alter_folder_can_have_posts'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures/', verbose_name='Profile Picture'),
        ),
    ]