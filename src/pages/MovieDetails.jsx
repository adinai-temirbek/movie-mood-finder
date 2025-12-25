// src/pages/MovieDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import FavoriteButton from "../components/FavoriteButton.jsx";

const IMG_BACKDROP = "https://image.tmdb.org/t/p/original";
const IMG_POSTER = "https://image.tmdb.org/t/p/w500";
const API_KEY = import.meta.env.VITE_TMDB_KEY;

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: "credits,videos,watch/providers",
        },
      })
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading movie:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{
        background: "radial-gradient(ellipse at top, #1a1a2e 0%, #0f0f1e 50%, #000000 100%)",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.3rem",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />

        <div style={{
          textAlign: "center"
        }}>
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
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ color: "#64748b", fontFamily: "'Inter', sans-serif" }}>Loading movie details...</div>
        </div>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const providers = movie["watch/providers"]?.results?.US?.flatrate || [];

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

      {/* Animated background orbs */}
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
        height: "600px",
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
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* Back Button */}
      <Link to="/" style={{
        position: "fixed",
        top: "90px",
        left: "30px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(20px)",
        padding: "14px 24px",
        borderRadius: "50px",
        border: "2px solid rgba(236, 72, 153, 0.4)",
        color: "white",
        fontSize: "1rem",
        fontFamily: "'Inter', sans-serif",
        fontWeight: "600",
        textDecoration: "none",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        transition: "all 0.3s ease",
        animation: "slideUp 0.6s ease",
        zIndex: 999
      }}>
        <span style={{ fontSize: "1.3rem" }}>←</span>
        <span>Back to Movies</span>
      </Link>

      {/* Backdrop Header */}
      <div style={{
        position: "relative",
        height: "60vh",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `url(${IMG_BACKDROP}${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
          animation: "fadeIn 1s ease"
        }} />
        
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 70%, #000000 100%)"
        }} />

        <div style={{
          position: "absolute",
          bottom: "40px",
          left: "60px",
          right: "60px",
          zIndex: 10,
          animation: "slideUp 0.8s ease 0.2s both"
        }}>
          <h1 style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "900",
            textShadow: "0 0 60px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.8)",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            margin: "0 0 15px 0"
          }}>
            {movie.title}
          </h1>
          {movie.tagline && (
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.6rem)",
              fontFamily: "'Inter', sans-serif",
              margin: "0",
              opacity: 0.9,
              color: "#94a3b8",
              fontStyle: "italic",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)"
            }}>
              "{movie.tagline}"
            </p>
          )}
        </div>

        {/* Favorite Heart */}
        <div style={{
          position: "absolute",
          top: "100px",
          right: "60px",
          zIndex: 10,
          animation: "slideUp 0.6s ease 0.3s both"
        }}>
          <FavoriteButton movie={movie} />
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "60px 40px 100px",
        animation: "slideUp 1s ease 0.4s both"
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "350px 1fr",
          gap: "60px",
          alignItems: "start"
        }}>
          {/* Poster */}
          <div style={{
            position: "sticky",
            top: "30px"
          }}>
            <img
              src={`${IMG_POSTER}${movie.poster_path}`}
              alt={movie.title}
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            />
          </div>

          {/* Info Section */}
          <div>
            {/* Rating and Meta */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              marginBottom: "30px",
              flexWrap: "wrap"
            }}>
              <div style={{
                background: "rgba(251, 191, 36, 0.15)",
                border: "2px solid rgba(251, 191, 36, 0.4)",
                padding: "12px 24px",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backdropFilter: "blur(10px)"
              }}>
                <span style={{ fontSize: "2rem" }}>⭐</span>
                <span style={{
                  fontSize: "2rem",
                  fontWeight: "900",
                  fontFamily: "'Poppins', sans-serif",
                  color: "#fbbf24"
                }}>
                  {movie.vote_average.toFixed(1)}
                </span>
                <span style={{ color: "#94a3b8", fontSize: "1.1rem", fontFamily: "'Inter', sans-serif" }}>/10</span>
              </div>

              <div style={{
                display: "flex",
                gap: "20px",
                color: "#cbd5e1",
                fontSize: "1.1rem",
                fontFamily: "'Inter', sans-serif"
              }}>
                <span>📅 {movie.release_date}</span>
                <span>⏱️ {movie.runtime} min</span>
              </div>
            </div>

            {/* Genres */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "40px"
            }}>
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  style={{
                    background: "rgba(139, 92, 246, 0.2)",
                    border: "1px solid rgba(139, 92, 246, 0.4)",
                    padding: "8px 20px",
                    borderRadius: "50px",
                    fontSize: "0.95rem",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: "500",
                    color: "#c4b5fd",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "40px"
            }}>
              <h2 style={{
                margin: "0 0 20px",
                fontSize: "1.8rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "700",
                color: "#f1f5f9"
              }}>
                Overview
              </h2>
              <p style={{
                fontSize: "1.2rem",
                fontFamily: "'Inter', sans-serif",
                lineHeight: "1.8",
                color: "#cbd5e1",
                margin: 0
              }}>
                {movie.overview}
              </p>
            </div>

            {/* Trailer Button */}
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
                  color: "white",
                  padding: "18px 40px",
                  borderRadius: "50px",
                  fontSize: "1.3rem",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "700",
                  textDecoration: "none",
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)",
                  transition: "all 0.3s ease",
                  border: "none",
                  cursor: "pointer",
                  marginBottom: "40px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(236, 72, 153, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(236, 72, 153, 0.4)";
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>▶️</span>
                Watch Trailer
              </a>
            )}

            {/* Streaming Providers */}
            {providers.length > 0 && (
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "30px"
              }}>
                <h3 style={{
                  margin: "0 0 20px",
                  fontSize: "1.5rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "700",
                  color: "#f1f5f9"
                }}>
                  Stream On
                </h3>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px"
                }}>
                  {providers.slice(0, 8).map((p) => (
                    <div
                      key={p.provider_id}
                      style={{
                        position: "relative",
                        transition: "transform 0.3s ease"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                        alt={p.provider_name}
                        title={p.provider_name}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "16px",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}