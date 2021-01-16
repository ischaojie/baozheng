import json

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
