import { Routes, Route } from "react-router-dom";
import WatchPage from "./components/WatchPage";
import MovieDetails from "./components/MovieDetails";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import { getMovies } from "./services/movieService";
import { Film } from "lucide-react";

function HomePage() {
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
        try {
            setLoading(true);

            const data = await getMovies();

            setMovies(data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch movies:", err);

            setError("Unable to load movies. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    fetchMovies();
}, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.genre.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, search]);

  const toggleWatchlist = (movie) => {
    setWatchlist((current) =>
      current.some((item) => item.id === movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [...current, movie]
    );
  };

  const trending = filteredMovies.filter(
    (movie) => movie.category === "Trending"
  );

  const popular = filteredMovies.filter(
    (movie) => movie.category === "Popular"
  );

  return (
    <div className="app">
      <Navbar search={search} setSearch={setSearch} />

      <Hero />

      <main className="catalogue" id="catalogue">
        {loading ? (
          <p className="empty-state">Loading movies...</p>
        ) : error ? (
          <p className="empty-state" role="alert">{error}</p>
        ) : movies.length === 0 ? (
          <p className="empty-state">No movies available yet.</p>
        ) : (
          <>
            {search ? (
              <MovieRow
                title={`Search results for "${search}"`}
                movies={filteredMovies}
                onWatchlist={toggleWatchlist}
              />
            ) : (
              <>
                <MovieRow
                  title="Trending Now"
                  movies={trending}
                  id="trending"
                  onWatchlist={toggleWatchlist}
                />

                <MovieRow
                  title="Popular on CineStream"
                  movies={popular}
                  id="popular"
                  onWatchlist={toggleWatchlist}
                />

                <MovieRow
                  title="Discover More"
                  movies={filteredMovies}
                  onWatchlist={toggleWatchlist}
                />
              </>
            )}

            {search && filteredMovies.length === 0 && (
              <p className="empty-state">
                No movies found. Try another search.
              </p>
            )}
          </>
        )}

        {watchlist.length > 0 && (
          <MovieRow
            title="My Watchlist"
            movies={watchlist}
            onWatchlist={toggleWatchlist}
          />
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <Film size={22} />
          CINESTREAM
        </div>

        <p>
          Your next cinematic experience starts here.
        </p>

        <span>© 2026 CineStream. Demo project.</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/watch/:id" element={<WatchPage />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
