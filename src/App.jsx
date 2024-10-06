import React, { useState, useEffect } from "react";
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

function App() {
  const [selectedMovie, setSelectedMovie] = useState();
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [orderedMovies, setOrderedMovies] = useState(mockedMoviesList);

  useEffect(() => {
    const sortedItems = [...orderedMovies].sort((a, b) =>
      sortOption === sortOptions[0] ? dateComparer(a, b) : titleComparer(a, b)
    );
    setOrderedMovies(sortedItems);
  }, [orderedMovies, sortOption]);

  const handleSearch = (param) => {
    alert(param);
  };

  const handleGenre = (param) => {
    alert(param);
  };

  const handleMovieClick = (param) => {
    setSelectedMovie(mockedMoviesList.find((movie) => movie.id === param));
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    const sorted = mockedMoviesList.sort((x) =>
      value === sortOptions[0] ? x.release_date : x.title
    );
    setOrderedMovies(sorted);
  };

  const genres = ["ALL", "DOCUMENTARY", "COMEDY", "HORROR", "CRIME"];

  return (
    <div className="App">
      <header className="App-header">
        <Counter initialValue={13}></Counter>
        <Search
          initialQuery="What do you want to watch?"
          onSearch={handleSearch}
        ></Search>
        <MovieDetails movie={selectedMovie} />
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
              imageUrl={movie.poster_path}
              key={index}
              name={movie.title}
              releaseYear={new Date(movie.release_date).getFullYear()}
              genres={movie.genres}
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
