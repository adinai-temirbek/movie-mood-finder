import { useState, useEffect } from "react";
import { getPopularMovies } from "./api/tmdb.js";

const IMG = "https://image.tmdb.org/t/p/w500";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPopularMovies()
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{
        background: "#000",
        color: "white",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem"
      }}>
        Loading awesome movies...
      </div>
    );
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white", padding: "40px 20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "3.5rem", marginBottom: "50px", fontWeight: "bold" }}>
        Mood Movies
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "30px",
        maxWidth: "1500px",
        margin: "0 auto"
      }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              background: "#111",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img
              src={`${IMG}${movie.poster_path}`}
              alt={movie.title}
              style={{ width: "100%", height: "330px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem", lineHeight: "1.3" }}>
                {movie.title.length > 30 ? movie.title.slice(0, 30) + "..." : movie.title}
              </h3>
              <p style={{ margin: 0, color: "#00ff9d", fontWeight: "bold", fontSize: "1.3rem" }}>
                {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <footer style={{ textAlign: "center", marginTop: "80px", color: "#666" }}>
        Powered by TMDB • Made with love for your capstone
      </footer>
    </div>
  );
}

export default App;
