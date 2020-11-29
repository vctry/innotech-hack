# Generated by Django 3.0.8 on 2020-11-28 23:18

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('first_name', models.TextField()),
                ('last_name', models.TextField()),
                ('verified', models.BooleanField()),
                ('birthday', models.DateField()),
                ('photo', models.ImageField(upload_to=api.models.user_directory_path)),
                ('photo_url', models.URLField()),
            ],
        ),
    ]