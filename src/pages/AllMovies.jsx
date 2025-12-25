// src/pages/AllMovies.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavoriteButton from "../components/FavoriteButton.jsx";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const IMG = "https://image.tmdb.org/t/p/w500";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      let url = search
        ? "https://api.themoviedb.org/3/search/movie"
        : "https://api.themoviedb.org/3/movie/popular";
      axios
        .get(url, {
          params: {
            api_key: API_KEY,
            query: search || undefined,
            page,
          },
        })
        .then((res) => {
          setMovies((prev) => [...prev, ...res.data.results]);
          setHasMore(page < res.data.total_pages);
        })
        .catch((err) => {
          console.error("Error loading movies:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  return (
    <div
      style={{
        paddingTop: "100px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000000, #1a0033)",
        color: "white",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <h1 style={{ 
          textAlign: "center", 
          fontSize: "3.5rem", 
          marginBottom: "40px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "900"
        }}>
          All Movies
        </h1>

        <input
          type="text"
          placeholder="Search any movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "20px",
            fontSize: "1.5rem",
            fontFamily: "'Inter', sans-serif",
            borderRadius: "50px",
            border: "none",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            marginBottom: "40px",
            textAlign: "center",
          }}
        />

        {loading && movies.length === 0 ? (
          <p style={{ 
            textAlign: "center", 
            fontSize: "1.2rem",
            fontFamily: "'Inter', sans-serif"
          }}>
            Searching...
          </p>
        ) : movies.length === 0 ? (
          <p style={{ 
            textAlign: "center", 
            fontSize: "1.2rem",
            fontFamily: "'Inter', sans-serif"
          }}>
            No movies found
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "30px",
            }}
          >
            {movies.map((movie) => (
              <div key={movie.id} style={{ position: "relative" }}>
                <Link
                  to={`/movie/${movie.id}`}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    display: "block",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {movie.poster_path ? (
                      <img
                        src={`${IMG}${movie.poster_path}`}
                        alt={movie.title}
                        style={{ width: "100%", display: "block" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          paddingBottom: "150%",
                          background: "#333",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "3rem",
                        }}
                      >
                        🎬
                      </div>
                    )}
                    <div style={{ padding: "15px", background: "#111" }}>
                      <h3
                        style={{
                          margin: "0 0 8px",
                          fontSize: "1.1rem",
                          lineHeight: "1.3",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: "600"
                        }}
                      >
                        {movie.title}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          color: "#00ff9d",
                          fontSize: "0.95rem",
                          fontFamily: "'Inter', sans-serif"
                        }}
                      >
                        ⭐ {movie.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* FavoriteButton positioned absolutely over the card */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    zIndex: 10,
                  }}
                >
                  <FavoriteButton movie={movie} />
                </div>
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div style={{ textAlign: "center", margin: "40px 0" }}>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              style={{
                padding: "15px 30px",
                fontSize: "1.2rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: "600",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                color: "white",
                border: "none",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Loading..." : "Show 20 More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}