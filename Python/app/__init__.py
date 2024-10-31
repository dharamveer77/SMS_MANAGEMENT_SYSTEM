from flask import Flask
from flask_cors import CORS
from Routes.routes import api
from Config.config import Config

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Adjust origins as needed
    app.config.from_object(Config)
    app.register_blueprint(api)
    return app

