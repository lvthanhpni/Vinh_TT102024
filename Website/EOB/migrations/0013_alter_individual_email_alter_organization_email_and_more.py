# Generated by Django 5.1.2 on 2024-11-05 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EOB', '0012_alter_individual_full_name_alter_organization_c_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='individual',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='vlxd',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='vlxd',
            name='job',
            field=models.CharField(max_length=50, verbose_name='Job Title'),
        ),
    ]