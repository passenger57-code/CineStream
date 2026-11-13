
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, id, onWatchlist }) {
  if (!movies.length) return null;

  return (
    <section className="movie-section" id={id}>
      <div className="section-heading">
        <h2>{title}</h2>
        <span>{movies.length} titles</span>
      </div>

      <div className="movie-row">
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <MovieCard
              movie={movie}
              onWatchlist={onWatchlist}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
