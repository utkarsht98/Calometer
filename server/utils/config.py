import sys, os
sys.path.append(os.path.abspath(os.path.join('..', 'app')))

from utils.app import app
from flaskext.mysql import MySQL

mysql_instance = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Le@rndb2898!'
app.config['MYSQL_DATABASE_DB'] = 'calometer'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql_instance.init_app(app)