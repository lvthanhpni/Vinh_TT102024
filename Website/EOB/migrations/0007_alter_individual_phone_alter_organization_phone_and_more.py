# Generated by Django 5.1.2 on 2024-10-23 03:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EOB', '0006_rename_is_indivdual_member_is_individual'),
    ]

    operations = [
        migrations.AlterField(
            model_name='individual',
            name='phone',
            field=models.CharField(max_length=50, verbose_name='Phone'),
        ),
        migrations.AlterField(
            model_name='organization',
            name='phone',
            field=models.CharField(max_length=50, verbose_name='Phone'),
        ),
        migrations.AlterField(
            model_name='vlxd',
            name='phone',
            field=models.CharField(max_length=50, verbose_name='Phone'),
        ),
    ]