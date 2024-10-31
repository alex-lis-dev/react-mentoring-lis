import React, { useEffect, useState } from "react";
import "./MovieListPage.css";
import Counter from "../Counter/Counter";
import GenreSelector from "../GenreSelector/GenreSelector";
import Search from "../Search/Search";
import MovieTile from "../MovieTile/MovieTile";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import sortOptions from "../../helpers/sortOptions";
import {
  AddMovieButtonText,
  SearchForm_Placeholder,
} from "../../helpers/constants";
import { getMovies } from "../../services.js";
import AddAndEditMovieDialog from "../MovieForm/components/AddAndEditMovieDialog/AddAndEditMovieDialog.jsx";

const MovieListPage = () => {
  const genres = ["All", "Documentary", "Horror", "War", "MUSIC"];

  const [orderedMovies, setOrderedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMovieDialogOpen, setOpen] = useState(false);

  const toggleDialog = () => setOpen(!isAddMovieDialogOpen);
  const handleSearch = (value) => setSearchQuery(value);
  const handleGenre = (genre) => setSelectedGenre(genre);
  const handleSortChange = (value) => setSortOption(value);
  const handleMovieClick = (id) =>
    setSelectedMovie(orderedMovies.find((movie) => movie.id === id));

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getMovies(
      sortOption,
      searchQuery,
      selectedGenre === "All" ? "" : selectedGenre,
      signal
    )
      .then((response) => setOrderedMovies(response.data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error.message);
        }
      });

    return () => controller.abort();
  }, [searchQuery, selectedGenre, sortOption]);

  return (
    <>
      <header className="App-header">
        {!selectedMovie ? (
          <div className="search-container">
            <div className="blur-effect"></div>
            <div className="content">
              <div>
                <button className="add-movie-button" onClick={toggleDialog}>
                  {AddMovieButtonText}
                </button>
                <AddAndEditMovieDialog
                  isOpen={isAddMovieDialogOpen}
                  onClose={toggleDialog}
                />
              </div>
              <Search
                placeholder={SearchForm_Placeholder}
                initialQuery={searchQuery}
                onSearch={handleSearch}
              ></Search>
            </div>
          </div>
        ) : (
          <div className="movie-details-container">
            <MovieDetails
              movie={selectedMovie}
              onSearchClick={() => setSelectedMovie()}
            />
          </div>
        )}
      </header>

      <div className="App-body">
        <GenreSelector
          genres={genres}
          selectedGenre={genres[0]}
          onSelect={handleGenre}
        ></GenreSelector>
        <SortControl
          currentSelection={sortOption}
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
