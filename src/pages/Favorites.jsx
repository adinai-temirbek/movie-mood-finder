// src/pages/Favorites.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const IMG = "https://image.tmdb.org/t/p/w500";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    console.log("📥 Loading favorites...");
    try {
      const res = await axios.get("http://localhost:4000/favorites");
      console.log("✅ Loaded from server:", res.data);
      setFavorites(res.data);
      localStorage.setItem("appFavorites", JSON.stringify(res.data));
    } catch (err) {
      console.log("❌ Server error:", err.message);
      const saved = localStorage.getItem("appFavorites");
      const localData = saved ? JSON.parse(saved) : [];
      console.log("💾 Loaded from localStorage:", localData);
      setFavorites(localData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (serverItem) => {
    console.log("🗑️ Removing movie:", serverItem.title);
    console.log("Server item ID:", serverItem.id);
    
    const newFavorites = favorites.filter(m => m.id !== serverItem.id);
    setFavorites(newFavorites);
    localStorage.setItem("appFavorites", JSON.stringify(newFavorites));
    console.log("✅ UI updated, new count:", newFavorites.length);
    
    try {
      console.log("🎯 Deleting from server with ID:", serverItem.id);
      const deleteRes = await axios.delete(`http://localhost:4001/favorites/${serverItem.id}`);
      console.log("✅ Delete successful! Status:", deleteRes.status);
      
      const verifyRes = await axios.get("http://localhost:4001/favorites");
      console.log("✅ Remaining favorites on server:", verifyRes.data.length);
    } catch (err) {
      console.error("❌ Server error:", err.message);
      console.error("Full error:", err.response?.data || err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1e 50%, #000000 100%)",
      color: "white",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />

      <div style={{
        position: "absolute",
        top: "-10%",
        right: "-5%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        animation: "float 20s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "-5%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
        animation: "float 15s ease-in-out infinite reverse",
        pointerEvents: "none"
      }} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(0.9); }
          20%, 40% { transform: scale(1.1); }
        }
        .movie-card:hover {
          transform: translateY(-12px) scale(1.03) !important;
        }
        .remove-btn:hover {
          color: #ff006e !important;
          transform: scale(1.2) !important;
        }
      `}</style>

      <div style={{ position: "relative", zIndex: 1, paddingTop: "120px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{
            textAlign: "center",
            marginBottom: "60px",
            animation: "fadeInUp 0.8s ease"
          }}>
            <div style={{
              fontSize: "5rem",
              marginBottom: "20px",
              animation: "heartbeat 2s ease-in-out infinite"
            }}>
              ❤️
            </div>
            <h1 style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "900",
              fontFamily: "'Poppins', sans-serif",
              background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
              animation: "shimmer 3s linear infinite"
            }}>
              My Favorites
            </h1>
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontFamily: "'Inter', sans-serif",
              color: "#94a3b8",
              fontWeight: "300",
              letterSpacing: "0.05em"
            }}>
              Your personal collection of beloved films
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", fontSize: "1.3rem", marginTop: "100px", color: "#64748b", fontFamily: "'Inter', sans-serif" }}>
              <div style={{
                display: "inline-block",
                width: "50px",
                height: "50px",
                border: "3px solid rgba(236, 72, 153, 0.3)",
                borderTopColor: "#ec4899",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "20px"
              }} />
              <div>Loading your favorites...</div>
            </div>
          ) : favorites.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "6rem", marginBottom: "30px", opacity: 0.5 }}>
                💔
              </div>
              <h2 style={{ fontSize: "2.5rem", fontFamily: "'Poppins', sans-serif", color: "#cbd5e1", marginBottom: "15px" }}>
                No favorites yet
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.2rem", fontFamily: "'Inter', sans-serif", marginBottom: "40px" }}>
                Start building your collection by adding movies you love!
              </p>
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                  color: "white",
                  padding: "16px 36px",
                  borderRadius: "50px",
                  fontSize: "1.2rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "700",
                  textDecoration: "none",
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)",
                  transition: "all 0.3s ease"
                }}
              >
                Discover Movies
              </Link>
            </div>
          ) : (
            <>
              <div style={{
                textAlign: "center",
                marginBottom: "40px",
                color: "#94a3b8",
                fontSize: "1.2rem",
                fontFamily: "'Inter', sans-serif"
              }}>
                {favorites.length} {favorites.length === 1 ? 'favorite movie' : 'favorite movies'} saved
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "30px"
              }}>
                {favorites.map((movie, idx) => (
                  <div
                    key={movie.id}
                    style={{
                      position: "relative",
                      animation: `fadeInUp 0.6s ease ${idx * 0.05}s both`
                    }}
                  >
                    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
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
                          transition: "transform 0.3s ease"
                        }}
                      >
                        <div style={{
                          position: "relative",
                          paddingBottom: "150%",
                          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                          overflow: "hidden"
                        }}>
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
                                objectFit: "cover"
                              }}
                            />
                          ) : (
                            <div style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              fontSize: "4rem",
                              opacity: 0.3
                            }}>
                              🎬
                            </div>
                          )}
                          <div style={{
                            position: "absolute",
                            top: "12px",
                            right: "12px",
                            background: "rgba(0, 0, 0, 0.7)",
                            backdropFilter: "blur(10px)",
                            padding: "6px 12px",
                            borderRadius: "20px",
                            fontSize: "0.9rem",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: "700",
                            color: "#fbbf24",
                            border: "1px solid rgba(251, 191, 36, 0.3)"
                          }}>
                            ⭐ {movie.vote_average.toFixed(1)}
                          </div>
                        </div>
                        <div style={{
                          padding: "20px",
                          background: "linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)"
                        }}>
                          <h3 style={{
                            margin: "0 0 8px",
                            fontSize: "1.15rem",
                            fontWeight: "600",
                            fontFamily: "'Poppins', sans-serif",
                            color: "#f1f5f9",
                            lineHeight: "1.4"
                          }}>
                            {movie.title}
                          </h3>
                          <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.85rem",
                            fontFamily: "'Inter', sans-serif",
                            color: "#94a3b8"
                          }}>
                            <span>📅 {movie.release_date?.split('-')[0] || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFavorite(movie);
                      }}
                      className="remove-btn"
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        background: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                        cursor: "pointer",
                        fontSize: "1.8rem",
                        transition: "all 0.3s ease",
                        color: "#94a3b8",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ff006e";
                        e.currentTarget.style.transform = "scale(1.2)";
                        e.currentTarget.style.background = "rgba(255, 0, 110, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#94a3b8";
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)";
                      }}
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                    >
                      <span style={{ pointerEvents: "none" }} aria-hidden="true">💔</span>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}