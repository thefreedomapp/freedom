from flask import Flask, jsonify
from json import load
import os
from waitress import serve

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
  return jsonify({"test": "WHY THI"})

serve(app, host='0.0.0.0', port=load(open(f'{os.path.dirname(os.path.realpath(__file__))}/../../config.json', 'r'))['port'] + 1)
