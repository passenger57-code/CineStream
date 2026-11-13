
from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models import Movie

movie_bp = Blueprint("movies", __name__, url_prefix="/api/movies")


# GET: Retrieve all published movies
@movie_bp.route("/", methods=["GET"])
def get_movies():
    movies = Movie.query.filter_by(is_published=True).all()

    return jsonify({
        "status": "success",
        "count": len(movies),
        "movies": [movie.to_dict() for movie in movies]
    }), 200


# GET: Retrieve one movie by ID
@movie_bp.route("/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    movie = db.session.get(Movie, movie_id)

    if not movie or not movie.is_published:
        return jsonify({
            "status": "error",
            "message": "Movie not found"
        }), 404

    return jsonify({
        "status": "success",
        "movie": movie.to_dict()
    }), 200


# POST: Add a new movie
@movie_bp.route("/", methods=["POST"])
def create_movie():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "status": "error",
            "message": "A valid JSON object is required"
        }), 400

    if not data.get("title") or not str(data["title"]).strip():
        return jsonify({
            "status": "error",
            "message": "Movie title is required"
        }), 400

    movie = Movie(
        title=str(data["title"]).strip(),
        description=data.get("description"),
        poster_url=data.get("poster_url"),
        backdrop_url=data.get("backdrop_url"),
        video_url=data.get("video_url"),
        trailer_url=data.get("trailer_url"),
        release_year=data.get("release_year"),
        duration=data.get("duration"),
        genre=data.get("genre"),
        rating=data.get("rating", 0.0),
        is_featured=data.get("is_featured", False),
        is_published=data.get("is_published", True)
    )

    db.session.add(movie)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Movie created successfully",
        "movie": movie.to_dict()
    }), 201


# PUT: Update an existing movie
@movie_bp.route("/<int:movie_id>", methods=["PUT"])
def update_movie(movie_id):
    movie = db.session.get(Movie, movie_id)

    if not movie:
        return jsonify({
            "status": "error",
            "message": "Movie not found"
        }), 404

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "status": "error",
            "message": "A valid JSON object is required"
        }), 400

    allowed_fields = [
        "title",
        "description",
        "poster_url",
        "backdrop_url",
        "video_url",
        "trailer_url",
        "release_year",
        "duration",
        "genre",
        "rating",
        "is_featured",
        "is_published"
    ]

    for field in allowed_fields:
        if field in data:
            setattr(movie, field, data[field])

    if not movie.title or not movie.title.strip():
        return jsonify({
            "status": "error",
            "message": "Movie title cannot be empty"
        }), 400

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Movie updated successfully",
        "movie": movie.to_dict()
    }), 200


# DELETE: Delete a movie
@movie_bp.route("/<int:movie_id>", methods=["DELETE"])
def delete_movie(movie_id):
    movie = db.session.get(Movie, movie_id)

    if not movie:
        return jsonify({
            "status": "error",
            "message": "Movie not found"
        }), 404

    db.session.delete(movie)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Movie deleted successfully"
    }), 200
