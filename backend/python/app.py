from flask import Flask, jsonify
from json import load
from waitress import serve

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
  return jsonify({"test": "WHY THI"})

if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=load(open('../../config.json', 'r'))['port'])
