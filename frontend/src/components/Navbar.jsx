
import { useState } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  X
} from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navbar"
    >
      <div className="nav-brand">
        <span>CINE</span>STREAM
      </div>

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#">Home</a>
        <a href="#trending">Trending</a>
        <a href="#popular">Movies</a>
        <a href="#catalogue">Explore</a>
      </div>

      <div className="nav-actions">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
        </button>

        <button className="icon-button profile" aria-label="Profile">
          <User size={20} />
        </button>

        <button
          className="mobile-menu icon-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.nav>
  );
}
