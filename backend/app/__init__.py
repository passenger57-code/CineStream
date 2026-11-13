
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from app.config import Config

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app, resources={
        r"/api/*": {"origins": "http://localhost:5173"}
    })

    @app.route("/api/health")
    def health():
        return jsonify({
            "status": "success",
            "message": "CineStream API is running!"
        })

    return app
