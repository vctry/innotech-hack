# face-recognizer

Детекция и распознавание лиц. Распознавание проводится по сохраненным в базе фотографиям. 

База фотографий хранится в папке _data/img_base/_. Информация о фотографии хранится в _data/img_base.csv_. 
Программой будут обработаны только фотографии, содержащиеся в _data/img_base.csv_. 
Обязательное поле - 'img_name', в котором записывается имя файла из _data/img_base/_ с расширением.

Перед запуском необходимо загрузить веса модели (https://yadi.sk/d/JeuM87M9Zbi2_w?w=1) и сохранить в директории _data/models/_.


Тестирование:

    python recognizer.py --image_path "full_path_to_image_you_need_to_detect"

как запустить back-end:

    pip install -r requremnets.txt
    python manage.py makemigrations
    python manage.py migrate
    python manage.py runserver

Урл для парсинга:
    
    127.0.0.1:8000/api/parse/?user_id=<user_id:int?str>
    <user_id> - integer или можно в принципе список в формате строки: "<user_id_1>,<user_id_2>,..."
   
 


