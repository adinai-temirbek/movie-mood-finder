// src/App.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { moods } from "./moods.js";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const IMG = "https://image.tmdb.org/t/p/w500";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedMoods, setSelectedMoods] = useState([]);

  const fetchMovies = async (currentPage) => {
    setLoading(true);
    try {
      let url = "https://api.themoviedb.org/3/movie/popular";
      const params = { api_key: API_KEY, page: currentPage };

      if (selectedMoods.length > 0) {
        const genreIds = [...new Set(selectedMoods.flatMap((m) => m.genres))];
        url = "https://api.themoviedb.org/3/discover/movie";
        params.with_genres = genreIds.join(",");
        params.sort_by = "vote_count.desc";
        params["vote_average.gte"] = 7;

        if (selectedMoods.some((m) => m.yearRange)) {
          params["primary_release_date.gte"] = "1980-01-01";
          params["primary_release_date.lte"] = "2005-12-31";
        }
      }

      const res = await axios.get(url, { params });
      
      if (currentPage === 1) {
        setMovies(res.data.results);
      } else {
        setMovies((prev) => [...prev, ...res.data.results]);
      }
      setHasMore(currentPage < res.data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchMovies(1);
  }, [selectedMoods]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  const toggleMood = (mood) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1e 50%, #000000 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      {/* Fonts are imported globally via src/index.css */}

      {/* Animated background orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 15s ease-in-out infinite reverse",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .movie-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .movie-card:hover {
          transform: translateY(-12px) scale(1.03);
        }
        .mood-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .mood-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .mood-btn:hover::before {
          width: 300px;
          height: 300px;
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px 60px",
            animation: "fadeInUp 0.8s ease",
          }}
        >
          <div
            style={{
              display: "inline-block",
              position: "relative",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                fontWeight: "900",
                fontFamily: "'Inter', sans-serif",
                background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: 0,
                letterSpacing: "-0.02em",
                textShadow: "0 0 80px rgba(236, 72, 153, 0.5)",
                animation: "shimmer 3s linear infinite",
              }}
            >
              MOOD MOVIES
            </h1>
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60%",
                height: "4px",
                background: "linear-gradient(90deg, transparent, #ec4899, transparent)",
                borderRadius: "2px",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              fontFamily: "'Inter', sans-serif",
              color: "#94a3b8",
              marginTop: "24px",
              fontWeight: "300",
              letterSpacing: "0.05em",
            }}
          >
            Select your vibe, discover your next favorite film
          </p>
        </div>

        {/* Mood Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
            padding: "0 20px",
            marginBottom: "80px",
            maxWidth: "1000px",
            margin: "0 auto 80px",
          }}
        >
          {moods.map((mood, idx) => (
            <button
              key={mood.name}
              onClick={() => toggleMood(mood)}
              className="mood-btn"
              style={{
                padding: "14px 28px",
                fontSize: "1.05rem",
                fontWeight: "600",
                fontFamily: "'Inter', sans-serif",
                borderRadius: "999px",
                border: selectedMoods.includes(mood)
                  ? "2px solid rgba(236, 72, 153, 0.8)"
                  : "2px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                background: selectedMoods.includes(mood)
                  ? "linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(139, 92, 246, 0.3))"
                  : "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                color: "white",
                boxShadow: selectedMoods.includes(mood)
                  ? "0 8px 32px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                  : "0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                animation: `fadeInUp 0.6s ease ${idx * 0.05}s both`,
                position: "relative",
                zIndex: 1,
              }}
            >
              <span className="emoji">{mood.emoji}</span> {mood.name}
            </button>
          ))}
        </div>

        {/* Floating action hint */}
        {selectedMoods.length === 0 && !loading && movies.length > 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              marginTop: "-40px",
              marginBottom: "40px",
              animation: "fadeInUp 1s ease 0.5s both",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(20px)",
                padding: "16px 32px",
                borderRadius: "50px",
                border: "1px solid rgba(236, 72, 153, 0.3)",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                fontSize: "0.95rem",
                fontFamily: "'Inter', sans-serif",
                color: "#cbd5e1",
              }}
            >
              👆 Pick a mood to get personalized recommendations
            </div>
          </div>
        )}

        {/* Movies Grid */}
        {loading && movies.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
              fontFamily: "'Inter', sans-serif",
              marginTop: "100px",
              color: "#64748b",
              animation: "fadeInUp 0.8s ease",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "50px",
                height: "50px",
                border: "3px solid rgba(236, 72, 153, 0.3)",
                borderTopColor: "#ec4899",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "20px",
              }}
            />
            <div>Curating perfect films for your mood...</div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "30px",
              padding: "0 40px 120px",
              maxWidth: "1600px",
              margin: "0 auto",
            }}
          >
            {movies.map((movie, idx) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <div
                  className="movie-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",
                    animation: `fadeInUp 0.6s ease ${idx * 0.05}s both`,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "150%",
                      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                      overflow: "hidden",
                    }}
                  >
                    {movie.poster_path ? (
                      <img
                        src={`${IMG}${movie.poster_path}`}
                        alt={movie.title}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "4rem",
                          opacity: 0.3,
                        }}
                      >
                        🎬
                      </div>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(10px)",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "700",
                        fontFamily: "'Inter', sans-serif",
                        color: "#fbbf24",
                        border: "1px solid rgba(251, 191, 36, 0.3)",
                      }}
                    >
                      ★ {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "20px",
                      background: "linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: "1.15rem",
                        fontWeight: "600",
                        fontFamily: "'Inter', sans-serif",
                        color: "#f1f5f9",
                        lineHeight: "1.4",
                      }}
                    >
                      {movie.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.85rem",
                        fontFamily: "'Inter', sans-serif",
                        color: "#94a3b8",
                      }}
                    >
                      <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {hasMore && !loading && (
          <div style={{ textAlign: "center", margin: "40px 0 80px" }}>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              style={{
                padding: "16px 40px",
                fontSize: "1.1rem",
                fontWeight: "600",
                fontFamily: "'Inter', sans-serif",
                borderRadius: "50px",
                background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                color: "white",
                border: "none",
                cursor: "pointer",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(236, 72, 153, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(236, 72, 153, 0.4)";
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