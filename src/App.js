// Placeholder wrapper file. The real component is in `src/App.jsx`.

import { useState } from "react";
import { getPopularMovies, discoverByMood } from "./api/tmdb.js";
import { moods } from "./moods.js";

const IMG = "https://image.tmdb.org/t/p/w500";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMoods, setSelectedMoods] = useState([]);

  const loadMovies = async (moodList = []) => {
    setLoading(true);
    try {
      if (moodList.length === 0) {
        const res = await getPopularMovies();
        setMovies(res.data.results);
      } else {
        const genreIds = [...new Set(moodList.flatMap(m => m.genres))];
        const yearRange = moodList.find(m => m.yearRange)?.yearRange || null;
        const res = await discoverByMood(genreIds, yearRange);
        setMovies(res.data.results);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggleMood = (mood) => {
    const newSelection = selectedMoods.includes(mood)
      ? selectedMoods.filter(m => m !== mood)
      : [...selectedMoods, mood];
    setSelectedMoods(newSelection);
    loadMovies(newSelection);
  };

  // Load popular movies on first visit
  if (movies.length === 0 && selectedMoods.length === 0) {
    loadMovies();
  }

  return (
    <div style={{ background: "#000", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "3rem", margin: "20px 0 40px" }}>
        Mood Movies
      </h1>

      {/* Mood Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "50px" }}>
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => toggleMood(mood)}
            style={{
              padding: "16px 24px",
              fontSize: "1.4rem",
              borderRadius: "50px",
              border: "none",
              background: selectedMoods.includes(mood) ? "#00ff9d" : "#222",
              color: selectedMoods.includes(mood) ? "black" : "white",
              cursor: "pointer",
              transition: "all 0.3s",
              fontWeight: "bold"
            }}
          >
            {mood.emoji} {mood.name}
          </button>
        ))}
      </div>

      {/* Movie Grid */}
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Finding perfect movies for you...</h2>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "25px",
          maxWidth: "1400px",
          margin: "0 auto"
        }}>
          {movies.map((movie) => (
            <div key={movie.id} style={{
              background: "#111",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.5)"
            }}>
              <img src={`${IMG}${movie.poster_path}`} alt={movie.title} style={{ width: "100%" }} />
              <div style={{ padding: "12px" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "1rem" }}>{movie.title}</h3>
                <p style={{ margin: 0, color: "#00ff9d" }}>★ {movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;