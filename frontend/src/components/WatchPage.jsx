
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hls from "hls.js";
import { ArrowLeft, Play, Film } from "lucide-react";
import { movies } from "../data/movies";

function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [error, setError] = useState("");

  const movie = movies.find((item) => String(item.id) === id);
  const videoUrl = movie?.videoUrl;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !videoUrl) return;

    setError("");

    let hls;

    if (videoUrl.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        hls = new Hls();

        hls.loadSource(videoUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            setError("Unable to load this stream. Please try again later.");
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
      } else {
        setError("HLS playback is not supported by this browser.");
      }
    } else {
      video.src = videoUrl;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }

      video.removeAttribute("src");
      video.load();
    };
  }, [videoUrl]);

  if (!movie) {
    return (
      <div className="watch-not-found">
        <h1>Movie not found</h1>
        <button onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <main className="watch-page">
      <header className="watch-header">
        <button
          className="watch-back-button"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <ArrowLeft size={20} />
          Back to Details
        </button>

        <h2>
          CINE<span>STREAM</span>
        </h2>
      </header>

      <section className="watch-container">
        <div className="video-wrapper">
          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            poster={movie.image}
          />

          {error && (
            <div className="video-error">
              {error}
            </div>
          )}
        </div>

        <div className="watch-movie-info">
          <div>
            <span className="watch-label">NOW PLAYING</span>
            <h1>{movie.title}</h1>

            <div className="watch-meta">
              <span>{movie.year}</span>
              <span>{movie.genre}</span>
              <span>★ {movie.rating}</span>
            </div>

            <p>{movie.description}</p>
          </div>
        </div>

        <section className="watch-recommendations">
          <h2>More Like This</h2>

          <div className="recommendation-grid">
            {movies
              .filter((item) => item.id !== movie.id)
              .slice(0, 4)
              .map((item) => (
                <button
                  className="recommendation-card"
                  key={item.id}
                  onClick={() => navigate(`/watch/${item.id}`)}
                >
                  <img src={item.image} alt={item.title} />

                  <div className="recommendation-info">
                    <h3>{item.title}</h3>
                    <span>{item.year} · {item.genre}</span>
                  </div>

                  <Play size={20} />
                </button>
              ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default WatchPage;
