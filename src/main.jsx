import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import AllMovies from "./pages/AllMovies.jsx";
import Favorites from "./pages/Favorites.jsx";
import Navbar from "./components/Navbar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all" element={<AllMovies />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);