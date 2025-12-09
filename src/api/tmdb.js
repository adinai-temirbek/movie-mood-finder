import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config.js";

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY },
});

export const getPopularMovies = (page = 1) =>
  api.get("/movie/popular", { params: { page } });

export const searchMovies = (query, page = 1) =>
  api.get("/search/movie", { params: { query, page } });

export const getMovieDetails = (id) =>
  api.get(`/movie/${id}`, {
    params: { append_to_response: "credits,videos,watch/providers" },
  });

export const discoverByMood = (genreIds, page = 1) =>
  api.get("/discover/movie", {
    params: {
      with_genres: genreIds.join(","),
      sort_by: "vote_count.desc",
      "vote_average.gte": 6.5,
      page,
    },
  });

export default api;