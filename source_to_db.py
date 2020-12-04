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

engine = create_engine('mysql+mysqlconnector://root:zhezhezhu@127.0.0.1:3306/sources', echo=False,)


chunksize = 500

idx = 1
for df in pd.read_csv("spam_message.txt", chunksize=chunksize, sep="\t"):

    if idx == 1:
        exists = 'replace'
    else:
        exists = 'append'

    df.to_sql(name='spamMessage', con=engine, if_exists=exists,
              index=False, chunksize=chunksize)

    print(str(chunksize * idx)+" Processed")
    idx = idx+1
