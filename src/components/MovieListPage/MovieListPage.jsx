import React, { useEffect, useState } from "react";
import "./MovieListPage.css";
import Counter from "../Counter/Counter";
import GenreSelector from "../GenreSelector/GenreSelector";
import MovieTile from "../MovieTile/MovieTile";
import SortControl from "../SortControl/SortControl";
import sortOptions from "../../helpers/sortOptions";
import { getMovies } from "../../services.js";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const MovieListPage = () => {
  const genres = [
    "All",
    "Documentary",
    "Comedy",
    "Horror",
    "War",
    "Music",
    "Action",
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [orderedMovies, setOrderedMovies] = useState([]);
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || genres[0];
  const sortBy = searchParams.get("sortBy") || sortOptions[0];

  const handleSearch = (value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), query: value });
  };

  const handleGenre = (value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), genre: value });
  };

  const handleSortChange = (value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), sortBy: value });
  };

  const handleMovieClick = (movieId) =>
    navigate(`/${movieId}${location.search}`);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getMovies(sortBy, query, genre === "All" ? "" : genre, signal)
      .then((response) => setOrderedMovies(response.data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error.message);
        }
      });

    return () => controller.abort();
  }, [query, genre, sortBy]);

  return (
    <>
      <header className="App-header">
        <Outlet context={{ query, handleSearch }} />
      </header>

      <div className="App-body">
        <GenreSelector
          genres={genres}
          selectedGenre={genre}
          onSelect={handleGenre}
        ></GenreSelector>
        <SortControl
          currentSelection={sortBy}
          onSortChange={handleSortChange}
        />

        <div className="total-count">
          <strong>{orderedMovies.length}</strong> movies found
        </div>

        <div className="App-movie-tiles">
          {orderedMovies.map((movie, index) => (
            <MovieTile
              movie={movie}
              key={index}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </div>

      <footer className="App-footer">
        <div className="netflix">
          <strong>netflix</strong>roulette
        </div>
        <Counter initialValue={13}></Counter>
      </footer>
    </>
  );
};

export default MovieListPage;
