
from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import db, migrate

def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app, resources={
        r"/api/*": {"origins": "http://localhost:5173"}
    })

    db.init_app(app)
    from app.models import Movie
    from app.routes import movie_bp
    migrate.init_app(app, db)
    app.register_blueprint(movie_bp)

    @app.route("/api/health")
    def health():
        return {"status": "success", "message": "CineStream API is running"}

    return app
