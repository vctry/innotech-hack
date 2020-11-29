import os
import pdb
from urllib import request

import requests
from django.conf import settings
from django.core.files import File
from django.db import models


# Create your models here.


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'user_{0}.jpg'.format(instance.user_id)


class UserData(models.Model):
    user_id = models.IntegerField()
    first_name = models.TextField()
    last_name = models.TextField()
    verified = models.BooleanField()
    birthday = models.DateField()
    photo = models.ImageField(upload_to=user_directory_path)
    photo_url = models.URLField()

    def save(self, *args, **kwargs):
        self.get_remote_image()

    def get_remote_image(self):
        if self.photo_url and not self.photo:
            result = request.urlretrieve(self.photo_url)
            self.photo.save(
                os.path.basename(self.photo_url),
                File(open(result[0], 'rb'))
            )
            self.save()
