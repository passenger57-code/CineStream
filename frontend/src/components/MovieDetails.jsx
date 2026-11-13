
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play, Plus, Star } from "lucide-react";
import { movies } from "../data/movies";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((item) => String(item.id) === id);

  if (!movie) {
    return (
      <div className="movie-not-found">
        <h1>Movie not found</h1>
        <button onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <main className="movie-details">
      <div
        className="details-backdrop"
        style={{ backgroundImage: `url("${movie.image}")` }}
      />

      <div className="details-content">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="details-info">
          <span className="details-label">CINESTREAM ORIGINAL</span>

          <h1>{movie.title}</h1>

          <div className="details-meta">
            <span>{movie.year}</span>
            <span>{movie.genre}</span>
            <span>
              <Star size={16} fill="currentColor" />
              {movie.rating}
            </span>
          </div>

          <p className="details-description">
            {movie.description}
          </p>

          <div className="details-buttons">
            <button
              className="details-play-button"
              onClick={() => navigate(`/watch/${movie.id}`)}
            >
              <Play size={20} fill="currentColor" />
              Play Movie
            </button>

            <button
              className="details-watchlist-button"
              onClick={() => alert("Watchlist integration coming soon!")}
            >
              <Plus size={20} />
              My Watchlist
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
