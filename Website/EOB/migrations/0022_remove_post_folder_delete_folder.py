# Generated by Django 5.1.2 on 2024-12-11 08:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EOB', '0021_folder_post_folder'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='folder',
        ),
        migrations.DeleteModel(
            name='Folder',
        ),
    ]