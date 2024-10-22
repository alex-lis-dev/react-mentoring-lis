import React, { useEffect, useState } from "react";
import "./MovieListPage.css";
import Counter from "../Counter/Counter";
import GenreSelector from "../GenreSelector/GenreSelector";
import Search from "../Search/Search";
import MovieTile from "../MovieTile/MovieTile";
// import mockedMoviesList from "../../mockedData/mockedMoviesList";
import MovieDetails from "../MovieDetails/MovieDetails";
import SortControl from "../SortControl/SortControl";
import sortOptions from "../../helpers/sortOptions";
import Dialog from "../Dialog/Dialog";
import {
  AddMovieButtonText,
  AddMovieText,
  SearchForm_Placeholder,
} from "../../helpers/constants";
import MovieForm from "../MovieForm/MovieForm.jsx";
import DeleteMovie from "../MovieForm/components/DeleteMovie/DeleteMovie";
import { getMovies } from "../../services.js";

const MovieListPage = () => {
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [movieToEdit, setMovieToEdit] = useState();
  const [movieToDelete, setMovieToDelete] = useState();

  const [orderedMovies, setOrderedMovies] = useState([]);

  const [isOpen, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const toggleDialog = () => {
    if (isOpen) setMovieToEdit();
    setOpen(!isOpen);
  };
  const toggleDeleteDialog = () => {
    if (isDeleteOpen) setMovieToDelete();
    setIsDeleteOpen(!isDeleteOpen);
  };
  const handleFormSubmit = (movieData) => {
    console.log(movieData);
    toggleDialog();
  };

  const handleDeleteMovie = () => {
    toggleDeleteDialog();
  };

  const handleSearch = (param) => {
    setSearchQuery(param);
  };

  const handleGenre = (param) => {
    setSelectedGenre(param);
  };

  useEffect(() => {
    getMovies(
      sortOption,
      searchQuery,
      selectedGenre === "All" ? "" : selectedGenre
    ).then((response) => setOrderedMovies(response.data));

    // let movies = mockedMoviesList;

    // if (searchQuery) {
    //   movies = movies.filter((movie) =>
    //     movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    // if (selectedGenre) {
    //   if (selectedGenre.toLowerCase() !== "All".toLowerCase())
    //     movies = movies.filter((movie) =>
    //       movie.genres
    //         .map((genre) => genre.toLowerCase())
    //         .includes(selectedGenre.toLowerCase())
    //     );
    // }

    // movies = movies.sort((a, b) =>
    //   sortOption === sortOptions[0] ? dateComparer(a, b) : titleComparer(a, b)
    // );

    // setOrderedMovies(movies);
  }, [searchQuery, selectedGenre, sortOption]);

  const handleMovieClick = (param) => {
    setSelectedMovie(orderedMovies.find((movie) => movie.id === param));
  };

  const handleMovieEditClick = (param) => {
    setMovieToEdit(orderedMovies.find((movie) => movie.id === param));
    setOpen(true);
  };
  const handleMovieDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const genres = [
    "All",
    "Documentary",
    "Horror",
    "War",
    "MUSIC",
    // ...new Set(
    //   orderedMovies.reduce((acc, movie) => acc.concat(movie.genres), [])
    // ),
  ];

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
                {isOpen && (
                  <Dialog title={AddMovieText} onClose={toggleDialog}>
                    <MovieForm
                      onSubmit={handleFormSubmit}
                      initialMovie={movieToEdit}
                    />
                  </Dialog>
                )}
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
              handleSearchIconClick={() => setSelectedMovie()}
            />
          </div>
        )}

        <div>
          {isDeleteOpen && (
            <Dialog title={"DELETE MOVIE"} onClose={toggleDeleteDialog}>
              <DeleteMovie
                deleteMovieCLick={handleDeleteMovie}
                movie={movieToDelete}
              />
            </Dialog>
          )}
        </div>
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
              id={movie.id}
              imageUrl={movie.poster_path}
              key={index}
              name={movie.title}
              releaseDate={movie.release_date}
              genres={movie.genres}
              onClick={() => handleMovieClick(movie.id)}
              onEditClick={() => handleMovieEditClick(movie.id)}
              onDeleteClick={() => handleMovieDeleteClick()}
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
