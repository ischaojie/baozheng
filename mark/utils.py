import os

import pandas as pd
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from sqlalchemy import create_engine


def parser_dataset_file(filename: str, dbname: str, sep='\t'):
    dataset = settings.DATABASES.get('datasets')

    MYSQL_USER = dataset['OPTIONS'].get('user', 'root')
    MYSQL_PASSWORD = dataset['OPTIONS'].get('password')
    MYSQL_HOST_IP = dataset['OPTIONS'].get('host', '127.0.0.1')
    MYSQL_PORT = dataset['OPTIONS'].get('port', '3306')
    MYSQL_DATABASE = dataset['OPTIONS'].get('database', 'datasets')
    engine = create_engine(
        f'mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST_IP}:{MYSQL_PORT}/{MYSQL_DATABASE}',
        echo=False)

    filepath = os.path.join(settings.MEDIA_ROOT, filename)
    # todo error process
    for df in pd.read_csv(filepath, chunksize=500, sep=sep):
        df.to_sql(name=dbname, con=engine, if_exists='replace', index_label='id', chunksize=500)

    return 'ok'


def dataset_file_exist_header(filename):
    # 判断文件是否存在 header
    with open(filename) as f:
        header = f.readlines()


class OverwriteStorage(FileSystemStorage):

    def get_available_name(self, name, max_length=None):
        """Returns a filename that's free on the target storage system, and
        available for new content to be written to.

        Found at http://djangosnippets.org/snippets/976/

        This file storage solves overwrite on upload problem. Another
        proposed solution was to override the save method on the model
        like so (from https://code.djangoproject.com/ticket/11663):

        def save(self, *args, **kwargs):
            try:
                this = MyModelName.objects.get(id=self.id)
                if this.MyImageFieldName != self.MyImageFieldName:
                    this.MyImageFieldName.delete()
            except: pass
            super(MyModelName, self).save(*args, **kwargs)
        """
        # If the filename already exists, remove it as if it was a true file system
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name
