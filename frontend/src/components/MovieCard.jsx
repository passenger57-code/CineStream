import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Plus } from "lucide-react";

export default function MovieCard({ movie, onWatchlist }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="movie-card"
      whileHover={{ scale: 1.06, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <img src={movie.image} alt={movie.title} />

      <div className="movie-overlay">
        <div className="movie-actions">
          <button
            className="card-play"
            aria-label={`Play ${movie.title}`}
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <Play size={18} fill="currentColor" />
          </button>

          <button
            className="card-add"
            aria-label={`Add ${movie.title} to watchlist`}
            onClick={() => onWatchlist(movie)}
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="movie-card-info">
          <h3>{movie.title}</h3>
          <span>
            {movie.year} · {movie.genre} · ★ {movie.rating}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
