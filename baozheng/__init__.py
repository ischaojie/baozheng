import pymysql

# fix install mysql-client error, mysql-client not support python>3.5
pymysql.version_info = (1, 4, 13, "final", 0)
pymysql.install_as_MySQLdb()
