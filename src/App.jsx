import { useState, useEffect } from "react";
import axios from "axios";
import { moods } from "./moods.js";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const IMG = "https://image.tmdb.org/t/p/w500";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMoods, setSelectedMoods] = useState([]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      let url = "https://api.themoviedb.org/3/movie/popular";
      const params = { api_key: API_KEY };

      if (selectedMoods.length > 0) {
        const genreIds = [...new Set(selectedMoods.flatMap(m => m.genres))];
        url = "https://api.themoviedb.org/3/discover/movie";
        Object.assign(params, {
          with_genres: genreIds.join(","),
          sort_by: "vote_count.desc",
          "vote_average.gte": 6.5,
        });

        const nostalgic = selectedMoods.find(m => m.yearRange);
        if (nostalgic) {
          params["primary_release_date.gte"] = "1980-01-01";
          params["primary_release_date.lte"] = "2005-12-31";
        }
      }

      const res = await axios.get(url, { params });
      setMovies(res.data.results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedMoods]);

  const toggleMood = (mood) => {
    setSelectedMoods(prev =>
      prev.includes(mood)
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  return (
    <div style={{ background: "#000", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "3rem", margin: "30px 0" }}>
        Mood Movies
      </h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", marginBottom: "50px" }}>
        {moods.map(mood => (
          <button
            key={mood.name}
            onClick={() => toggleMood(mood)}
            style={{
              padding: "18px 28px",
              fontSize: "1.5rem",
              borderRadius: "50px",
              border: "none",
              background: selectedMoods.includes(mood) ? "#00ff9d" : "#222",
              color: selectedMoods.includes(mood) ? "black" : "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {mood.emoji} {mood.name}
          </button>
        ))}
      </div>

      {loading ? (
        <h2 style={{ textAlign: "center", color: "#aaa" }}>Loading movies for your mood...</h2>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "30px",
          maxWidth: "1500px",
          margin: "0 auto"
        }}>
          {movies.map(movie => (
            <div key={movie.id} style={{ background: "#111", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
              <img src={`${IMG}${movie.poster_path}`} alt={movie.title} style={{ width: "100%", display: "block" }} />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem" }}>{movie.title}</h3>
                <p style={{ margin: 0, color: "#00ff9d", fontWeight: "bold" }}>★ {movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;