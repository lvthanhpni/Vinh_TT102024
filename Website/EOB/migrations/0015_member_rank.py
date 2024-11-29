# Generated by Django 5.1.2 on 2024-11-29 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EOB', '0014_rename_full_name_individual_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='member',
            name='rank',
            field=models.PositiveIntegerField(choices=[(1, 'Star'), (2, 'Pro'), (3, 'VIP')], default=1),
        ),
    ]
