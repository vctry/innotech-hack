import base64
import pdb
from datetime import datetime

from django.shortcuts import render

from recognizer import FaceRecognizer
from .models import UserData

from rest_framework.views import APIView
import requests
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status


# Create your views here.


class ParserView(APIView):
    def get(self, request, format=None):
        user_id = request.GET.get('user_id', None)
        if user_id:
            url_user = "https://api.vk.com/method/users.get/"
            params = {
                "v": 5.52,
                "name_case": "Nom",
                "fields": "photo_200_orig,verified,bdate",
                "user_ids": "{}".format(user_id),
                "access_token": "d3998b4c24aace8f907e70e7bf7555b754a8025f7ac26bb3e3f4a4955457fb6db9388f14c399ab1c4a447"
            }
            response_user = requests.get(url=url_user, params=params)
            if response_user.status_code == 200:
                users = response_user.json()['response']
                for user in users:
                    if user.get("deactivated", None) is None:
                        birthday = user['bdate'].split(".")
                        if int(birthday[1]) < 10:
                            birthday[1] = "0" + birthday[1]
                        birthday = ".".join(birthday)
                        birthday = datetime.strptime(birthday, "%d.%m.%Y")
                        # pdb.set_trace()
                        user_object = UserData(user_id=user['id'],
                                               first_name=user['first_name'],
                                               last_name=user['last_name'],
                                               photo_url=user['photo_200_orig'],
                                               verified=user['verified'],
                                               birthday=birthday)
                        user_object.save()
                return Response(data={"status": "OK", "user": users[0]})
            return Response(data={"status": "error:user_not_found"})

        return Response(data={"status": "error:form"})


class Recognizer(APIView):
    def post(self, request, format=None):
        params = request.data
        img_data = params.get("image")
        with open("test.jpg", "wb") as fh:
            fh.write(base64.decodebytes(img_data))
        recognizer = FaceRecognizer()
        labels = recognizer.calculate_distances("test.jpg")
        return Response(data={"status": "OK", "label": labels})
