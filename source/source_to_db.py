import os
import pandas as pd
import mysql.connector
from sqlalchemy import types, create_engine

# MySQL Connection
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'zhezhezhu'
MYSQL_HOST_IP = '127.0.0.1'
MYSQL_PORT = 3306
MYSQL_DATABASE = 'sources'

db_addr = 'mysql+mysqlconnector://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST_IP}:{MYSQL_PORT}/{MYSQL_DATABASE}'

engine = create_engine('mysql+mysqlconnector://root:19(zhezhezhu)95@127.0.0.1:3306/sources', echo=False,)

# drop mysql table



chunksize = 1000

here = os.path.abspath(os.path.dirname(__file__))

idx = 1

for df in pd.read_csv(here+"/spam_message.txt", sep="\t", header=None, 
                    names=['category', 'head', 'detail'], 
                    chunksize=chunksize):

    if idx == 1:
        exists = 'replace'
    else:
        exists = 'append'
    # convert index to column 'id'
    df['id'] = df.index
    df['marked'] = False

    df.to_sql(name='mark_source', con=engine, if_exists=exists,
              index=False, chunksize=chunksize)

    print(str(chunksize * idx)+" Processed")
    idx = idx+1
