
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-background" />

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-tag">
            CINESTREAM ORIGINAL
          </span>

          <h1>
            THE LAST
            <br />
            <span>HORIZON</span>
          </h1>

          <div className="hero-meta">
            <span>2026</span>
            <span>SCI-FI</span>
            <span>8.9 ★</span>
            <span>4K UHD</span>
          </div>

          <p>
            When humanity reaches the edge of the universe,
            one discovery changes everything. Experience
            a cinematic adventure beyond imagination.
          </p>

          <div className="hero-buttons">
            <button
              className="play-button"
              onClick={() => alert("Video player coming soon!")}
            >
              <Play size={19} fill="currentColor" />
              Watch Now
            </button>

            <button
              className="info-button"
              onClick={() => document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Info size={19} />
              Explore Movies
            </button>
          </div>
        </motion.div>
      </div>

      <div className="hero-gradient" />
    </section>
  );
}
