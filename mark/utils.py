import json
import os

from django.conf import settings
from django.core import serializers
from django.db.models import QuerySet, Model
from django.forms import model_to_dict
from django.http import JsonResponse


class IJsonResponse(JsonResponse):
    def __init__(self, status, data, message=None, **kwargs):
        """
        IJsonResponse defined a standard response with JSON format
        :param status: the response status, should be 'success', 'fail', 'error'
        :param data: the response data
        :param message: message for response, if status id fail, should add a message
        :param kwargs: another httpResponse params
        """
        for k, v in data.items():
            if isinstance(v, QuerySet):
                v = serializers.serialize('json', v)
                v = json.loads(v)
                data[k] = v
            elif isinstance(v, Model):
                data[k] = model_to_dict(v)

        resp_data = {
            'status': status,
            'data': data
        }

        if message:
            resp_data['message'] = message

        super().__init__(data=resp_data, json_dumps_params={'ensure_ascii': False}, **kwargs)


import pandas as pd
from sqlalchemy import create_engine


def parser_dataset_file(filename: str, dbname: str, sep='\t'):
    dataset = settings.DATABASES.get('datasets')
    MYSQL_USER = dataset.get('user', 'root')
    MYSQL_PASSWORD = dataset.get('password')
    MYSQL_HOST_IP = dataset.get('host', '127.0.0.1')
    MYSQL_PORT = dataset.get('port', '3306')
    MYSQL_DATABASE = dataset.get('database', 'datasets')
    engine = create_engine(
        f'mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST_IP}:{MYSQL_PORT}/{MYSQL_DATABASE}',
        echo=False)

    filepath = os.path.join(settings.DATASETS_DIR, filename)
    # todo error process
    for df in pd.read_csv(filepath, chunksize=500, sep=sep):
        df.to_sql(name=dbname, con=engine, if_exists='replace', index=False, chunksize=500)

    return 'ok'


def dataset_file_exist_header(filename):
    # 判断文件是否存在 header
    with open(filename) as f:
        header = f.readlines()
