# Generated by Django 2.2 on 2019-04-14 06:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='title',
            field=models.CharField(default='', max_length=200),
        ),
    ]