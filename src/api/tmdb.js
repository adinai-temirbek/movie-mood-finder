// src/api/tmdb.js
// src/api/tmdb.js
import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config.js";

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY },
});

export const getPopularMovies = () => api.get("/movie/popular");

export const discoverByMood = (genreIds, yearRange = null) => {
  const params = {
    with_genres: genreIds.join(","),
    sort_by: "vote_count.desc",
    "vote_average.gte": 6.5,
  };
  if (yearRange) {
    const [start, end] = yearRange.split("-");
    params["primary_release_date.gte"] = `${start}-01-01`;
    params["primary_release_date.lte"] = `${end}-12-31`;
  }
  return api.get("/discover/movie", { params });
};

export const getMovieDetails = (id) =>
  api.get(`/movie/${id}`, { params: { append_to_response: "credits,videos,watch/providers" } });