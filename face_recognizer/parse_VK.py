import requests
import os
import csv
import pandas as pd
from datetime import datetime


def load_user(user_id, folder):
    url_user = "https://api.vk.com/method/users.get/"
    params = {
        "v": 5.52,
        "name_case": "Nom",
        "fields": "photo_200_orig,verified",
        "user_ids": "{}".format(user_id),
        "access_token": "d3998b4c24aace8f907e70e7bf7555b754a8025f7ac26bb3e3f4a4955457fb6db9388f14c399ab1c4a447"
    }

    with open('data/img_base.csv', 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f, delimiter=';')
        writer.writerow(['img_name', 'Id', 'first_name', 'last_name'])

    response_user = requests.get(url=url_user, params=params)
    if response_user.status_code == 200:
        users = response_user.json()['response']
    if not os.path.exists(folder):
        os.mkdir(folder)
    for user in users:
        if user.get("deactivated", None) is None:
            with open('data/img_base.csv', 'a', newline='', encoding='utf-8') as f:
                writer = csv.writer(f, delimiter=';')
                writer.writerow([f"{user['id']}.jpg", user['id'], user['first_name'], user['last_name']])
            print(user)
            response = requests.get(user["photo_200_orig"])
            if response.status_code == 200:
                with open(os.path.join(folder, "{}.jpg".format(user["id"])), "wb") as f:
                    f.write(response.content)
    else:
        return None


if __name__ == '__main__':
    # os.redir('data/img_base')
    photo_dir = 'data/img_base'
    users = ",".join(list(map(str, range(1000, 1010))))
    load_user(users, photo_dir)
