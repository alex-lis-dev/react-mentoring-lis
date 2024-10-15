import React, { useEffect, useState } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelector from "./components/GenreSelector/GenreSelector";
import Search from "./components/Search/Search";
import MovieTile from "./components/MovieTile/MovieTile";
import mockedMoviesList from "./mockedData/mockedMoviesList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SortControl from "./components/SortControl/SortControl";
import dateComparer from "./helpers/dateComparer";
import titleComparer from "./helpers/titleComparer";
import sortOptions from "./helpers/sortOptions";
import Dialog from "./components/Dialog/Dialog";
import { AddMovieButtonText, AddMovieText } from "./helpers/constants";
import MovieForm from "./components/MovieForm/MovieForm.jsx";
import DeleteMovie from "./components/MovieForm/components/DeleteMovie.jsx";

function App() {
  const [selectedMovie, setSelectedMovie] = useState();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [movieToEdit, setMovieToEdit] = useState();

  const [orderedMovies, setOrderedMovies] = useState(
    mockedMoviesList.sort((a, b) =>
      sortOption === sortOptions[0] ? dateComparer(a, b) : titleComparer(a, b)
    )
  );

  const [isOpen, setOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const toggleDialog = () => setOpen(!isOpen);
  const toggleDeleteDialog = () => setIsDeleteOpen(!isDeleteOpen);
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
    let movies = mockedMoviesList;

    if (searchQuery) {
      movies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      if (selectedGenre.toLowerCase() !== "All".toLowerCase())
        movies = movies.filter((movie) =>
          movie.genres
            .map((genre) => genre.toLowerCase())
            .includes(selectedGenre.toLowerCase())
        );
    }

    movies = movies.sort((a, b) =>
      sortOption === sortOptions[0] ? dateComparer(a, b) : titleComparer(a, b)
    );

    setOrderedMovies(movies);
  }, [searchQuery, selectedGenre, sortOption]);

  const handleMovieClick = (param) => {
    setSelectedMovie(mockedMoviesList.find((movie) => movie.id === param));
  };

  const handleMovieEditClick = (param) => {
    setMovieToEdit(mockedMoviesList.find((movie) => movie.id === param));
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
    ...new Set(
      mockedMoviesList.reduce((acc, movie) => acc.concat(movie.genres), [])
    ),
  ];

  return (
    <div className="App">
      <header className="App-header">
        <Counter initialValue={13}></Counter>
        <div>
          <button onClick={toggleDialog}>{AddMovieButtonText}</button>
          {isOpen && (
            <Dialog title={AddMovieText} onClose={toggleDialog}>
              <MovieForm onSubmit={handleFormSubmit} initialMovie={movieToEdit}/>
            </Dialog>
          )}
        </div>

        <div>
          {isDeleteOpen && (
            <Dialog title={"DELETE MOVIE"} onClose={toggleDeleteDialog}>
              <DeleteMovie deleteMovieCLick={handleDeleteMovie}/>
            </Dialog>
          )}
        </div>
        <Search
          placeholder={"What do you want?"}
          initialQuery={searchQuery}
          onSearch={handleSearch}
        ></Search>

        {Boolean(selectedMovie) && (
          <div>
            <MovieDetails movie={selectedMovie} />
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
    </div>
  );
}

export default App;
