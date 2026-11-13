
from datetime import datetime, timezone

from app.extensions import db


class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)

    poster_url = db.Column(db.String(500), nullable=True)
    backdrop_url = db.Column(db.String(500), nullable=True)

    video_url = db.Column(db.String(500), nullable=True)
    trailer_url = db.Column(db.String(500), nullable=True)

    release_year = db.Column(db.Integer, nullable=True)
    duration = db.Column(db.Integer, nullable=True)

    genre = db.Column(db.String(100), nullable=True)
    rating = db.Column(db.Float, default=0.0)

    is_featured = db.Column(db.Boolean, default=False)
    is_published = db.Column(db.Boolean, default=True)

    created_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "poster_url": self.poster_url,
            "backdrop_url": self.backdrop_url,
            "video_url": self.video_url,
            "trailer_url": self.trailer_url,
            "release_year": self.release_year,
            "duration": self.duration,
            "genre": self.genre,
            "rating": self.rating,
            "is_featured": self.is_featured,
            "is_published": self.is_published,
        }
