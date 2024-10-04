import React, { useState, useEffect } from "react";
import "./App.css";
import Counter from "./components/Counter/Counter";
import GenreSelector from "./components/GenreSelector/GenreSelector";
import Search from "./components/Search/Search";
import MovieTile from "./components/MovieTile/MovieTile";
import mockedMoviesList from "./mockedData/mockedMoviesList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SortControl from "./components/SortControl/SortControl";

function App() {
  const [selectedMovie, setSelectedMovie] = useState();
  const [sortOption, setSortOption] = useState("releaseDate");
  const [orderedMovies, setOrderedMovies] = useState(mockedMoviesList);
  const TitleSort = (a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    return 0;
  };

  const DateSort = (a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const sortedItems = [...orderedMovies].sort((a, b) =>
      sortOption === "releaseDate" ? DateSort(a, b) : TitleSort(a, b)
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
      value === "releaseDate" ? x.release_date : x.title
    );
    console.log("Movies", sorted);
    setOrderedMovies(sorted);
    console.log("Sort by", value);
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
