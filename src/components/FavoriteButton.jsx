// src/components/FavoriteButton.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4001/favorites";

export default function FavoriteButton({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const res = await axios.get(API_URL);
        if (!mounted) return;
        // Check if movie exists - look for matching TMDB movie data
        const exists = res.data.some((f) => 
          f.id === movie.id || // If IDs match
          (f.title === movie.title && f.release_date === movie.release_date) // Or same movie
        );
        setIsFavorite(exists);
      } catch (e) {
        // Server down — check localStorage
        const saved = localStorage.getItem("appFavorites");
        if (saved && mounted) {
          const list = JSON.parse(saved);
          setIsFavorite(list.some((f) => f.id === movie.id));
        }
      }
    };
    check();
    return () => {
      mounted = false;
    };
  }, [movie.id, movie.title, movie.release_date]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading) return;
    setLoading(true);

    const newFavoriteState = !isFavorite;
    
    // Optimistic update
    setIsFavorite(newFavoriteState);

    try {
      if (isFavorite) {
        // ===== REMOVE from favorites =====
        console.log("🗑️ Removing movie:", movie.title, "with TMDB id:", movie.id);
        
        // Get all favorites to find the server-assigned ID
        const res = await axios.get(API_URL);
        console.log("📋 All favorites from server:", res.data);
        
        // Find by TMDB id OR by title+release_date match
        const itemToDelete = res.data.find((f) => 
          f.id === movie.id || 
          (f.title === movie.title && f.release_date === movie.release_date)
        );
        
        if (itemToDelete) {
          console.log("🔍 Found item to delete:", itemToDelete);
          console.log("🎯 Item's server ID:", itemToDelete.id);
          
          // Delete using whatever ID the item has on the server
          await axios.delete(`${API_URL}/${itemToDelete.id}`);
          console.log("✅ Successfully deleted from server using ID:", itemToDelete.id);
          
          // Verify deletion
          const verifyRes = await axios.get(API_URL);
          console.log("✅ Remaining favorites:", verifyRes.data.length);
        } else {
          console.log("⚠️ Item not found on server");
        }
        
        // Update localStorage - use original TMDB ID
        const saved = localStorage.getItem("appFavorites");
        if (saved) {
          const list = JSON.parse(saved);
          const next = list.filter((m) => m.id !== movie.id);
          localStorage.setItem("appFavorites", JSON.stringify(next));
          console.log("✅ Updated localStorage");
        }
      } else {
        // ===== ADD to favorites =====
        console.log("➕ Adding movie:", movie.title, "with TMDB id:", movie.id);
        
        // Check if already exists
        const checkRes = await axios.get(API_URL);
        const exists = checkRes.data.some((f) => 
          f.id === movie.id || 
          (f.title === movie.title && f.release_date === movie.release_date)
        );
        
        if (!exists) {
          // POST to add - json-server will assign its own ID
          const response = await axios.post(API_URL, movie);
          console.log("✅ Successfully added to server with server ID:", response.data.id);
          console.log("📝 Movie's original TMDB ID:", movie.id);
        } else {
          console.log("⚠️ Movie already in favorites");
        }
        
        // Update localStorage with original TMDB ID
        const saved = localStorage.getItem("appFavorites");
        const list = saved ? JSON.parse(saved) : [];
        if (!list.some((m) => m.id === movie.id)) {
          list.push(movie);
          localStorage.setItem("appFavorites", JSON.stringify(list));
          console.log("✅ Updated localStorage");
        }
      }
    } catch (e) {
      console.error("❌ Error toggling favorite:", e);
      console.error("Full error:", e.response?.data || e.message);
      
      // Revert optimistic update on error
      setIsFavorite(!newFavoriteState);
      
      // Server down — use localStorage fallback
      const saved = localStorage.getItem("appFavorites");
      const list = saved ? JSON.parse(saved) : [];
      
      if (newFavoriteState) {
        // Was trying to add
        if (!list.some((m) => m.id === movie.id)) {
          list.push(movie);
          localStorage.setItem("appFavorites", JSON.stringify(list));
          console.log("💾 Fallback: Added to localStorage");
          setIsFavorite(true);
        }
      } else {
        // Was trying to remove
        const next = list.filter((m) => m.id !== movie.id);
        localStorage.setItem("appFavorites", JSON.stringify(next));
        console.log("💾 Fallback: Removed from localStorage");
        setIsFavorite(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: isFavorite ? "rgba(236, 72, 153, 0.9)" : "rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        border: isFavorite ? "2px solid #ec4899" : "2px solid rgba(255,255,255,0.12)",
        width: 60,
        height: 60,
        borderRadius: "50%",
        fontSize: "1.8rem",
        cursor: loading ? "wait" : "pointer",
        boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
        transition: "all 0.25s ease",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: loading ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.transform = "scale(1.1)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span style={{ pointerEvents: "none" }} aria-hidden="true">
        {isFavorite ? "❤️" : "🤍"}
      </span>
    </button>
  );
}