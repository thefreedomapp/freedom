from flask import Flask
from json import load
import os
from waitress import serve
from importlib import import_module

def __init__(*args, **kwargs):
  app = Flask(__name__)

  routes = []
  for route in os.scandir(f'{os.path.dirname(os.path.realpath(__file__))}/routes'):
    if route.is_file(follow_symlinks=False):
      routes.append(route)

  for route in routes:
    import_module(f'routes.{route.name.replace(".py", "")}').__init__(app)

  serve(app, host='0.0.0.0', port=load(open(f'{os.path.dirname(os.path.realpath(__file__))}/../../config.json', 'r'))['port'] + 1)
