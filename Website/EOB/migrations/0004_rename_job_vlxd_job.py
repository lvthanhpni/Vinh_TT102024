# Generated by Django 5.1.2 on 2024-10-23 02:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EOB', '0003_rename_user_individual_full_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vlxd',
            old_name='Job',
            new_name='job',
        ),
    ]