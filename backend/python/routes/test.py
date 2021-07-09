def __init__(app):
  @app.route('/')
  def index():
    return '<h1>???</h1>'
