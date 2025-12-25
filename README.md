# Movie Mood Finder

## Project Description
Movie Mood Finder is a modern web application that helps users discover movies based on their current mood. It integrates with the TMDB (The Movie Database) API to fetch real-time movie data, allowing users to browse popular movies, search for specific titles, view detailed movie information (including trailers and streaming options), and manage a personal favorites list. The app features a unique mood-based recommendation system, where users select moods like "Happy" or "Scary" to get tailored movie suggestions.

### Main Features
- **Mood-Based Discovery (Home Page)**: Select one or more moods to get curated movie recommendations (e.g., comedies for "Happy", horrors for "Scary").
- **All Movies Page with Search**: Browse popular movies or search for any movie using a debounced search bar.
- **Movie Details Page**: View detailed info, rating, genres, overview, release date, runtime, trailer (YouTube embed), and streaming providers.
- **Favorites Page**: Add/remove movies to a personal favorites list with CRUD operations (persists via json-server or localStorage fallback).
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop with beautiful dark theme, gradient backgrounds, glassmorphism effects, and animations (orbs, hovers, fades).
- **Error Handling & Loading States**: Spinners and friendly messages for loading, errors, and empty results.
- **Navigation Bar**: Easy switching between Home, All Movies, and Favorites.

## API Used
- **TMDB (The Movie Database) API**: For movie data, search, discovery, details, trailers, and streaming info.
  - Documentation: [TMDB API Docs](https://developer.themoviedb.org/docs)
  - Note: Requires a free API key from TMDB. The app uses it for all GET requests.
- **json-server**: Mock backend for favorites CRUD (POST to add, DELETE to remove).
  - Documentation: [json-server on GitHub](https://github.com/typicode/json-server)
  - Used for local persistence of favorites.

## Tech Stack
- **Frontend Framework**: React (v18) with Vite for fast development and build.
- **Routing**: React Router v6 for navigation between pages.
- **API Calls**: Axios for async HTTP requests to TMDB and json-server.
- **Styling**: Pure CSS with inline styles (gradients, glassmorphism, animations via keyframes).
- **State Management**: React hooks (useState, useEffect).
- **Persistence**: json-server for CRUD (falls back to localStorage if server off).
- **Other**: TMDB API for data, YouTube embeds for trailers.

## How to Run the Project Locally
1. **Clone the Repository**:
   ```
   git clone <your-repo-url>
   cd movie-mood-finder
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root folder.
   - Add your TMDB API key:
     ```
     VITE_TMDB_KEY=your_tmdb_api_key_here
     ```
   - Get a free key from [TMDB](https://www.themoviedb.org/settings/api).

4. **Start the Mock Backend (json-server)**:
   - Create `db.json` in the root if not present:
     ```
     {
       "favorites": []
     }
     ```
   - Run:
     ```
     npm run server
     ```
   - This starts the server at http://localhost:4000/favorites.

5. **Start the Development Server**:
   ```
   npm run dev
   ```
   - Open http://localhost:5173 in your browser.
   - Use the app: Select moods on Home, search on All Movies, add/remove favorites.

6. **Build for Production** (optional):
   ```
   npm run build
   ```

## Known Limitations
- **Favorites Persistence**: Relies on json-server (local only). In production, you'd need a real backend (e.g., Firebase) for multi-device sync. LocalStorage fallback works but is device-specific.
- **TMDB API Limits**: Free tier has rate limits (40 requests/10 seconds). Heavy use may cause temporary blocks.
- **No Authentication**: Favorites are not user-specific (shared on local server).
- **Pagination/Infinite Scroll**: Current implementation shows 20 movies per page/search. Add infinite scroll for better UX.
- **Trailer/Streaming**: Trailer links to YouTube; streaming providers are US-only (TMDB limitation).
- **Mood Mapping**: Moods are hardcoded to genres (e.g., "Happy" → Comedy). Could be improved with ML-based recommendations.
- **No Offline Support**: App requires internet for TMDB API (favorites fallback to localStorage).
- **Browser Compatibility**: Tested on modern browsers; older ones may not support CSS features like backdrop-filter.