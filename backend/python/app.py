from flask import Flask
from json import load
import os
from waitress import serve
from importlib import import_module

app = Flask(__name__)

routes = os.listdir(f'{os.path.dirname(os.path.realpath(__file__))}/routes')

for route in routes:
  import_module(f'routes.{route.replace(".py", "")}').__init__(app)

serve(app, host='0.0.0.0', port=load(open(f'{os.path.dirname(os.path.realpath(__file__))}/../../config.json', 'r'))['port'] + 1)
