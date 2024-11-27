import GenreSelector from "../GenreSelector/GenreSelector";
import MovieTile from "../MovieTile/MovieTile";
import SortControl from "../SortControl/SortControl";
import { useLocation, useNavigate } from "react-router-dom";
import genres from "../../helpers/genres.js";
import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.css";

const MovieListPage = ({
  genre,
  sortBy,
  handleGenre,
  handleSortChange,
  orderedMovies,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleMovieClick = (movieId) =>
    navigate(`/${movieId}${location.search}`);

  return (
    <>
      <GenreSelector
        genres={genres}
        selectedGenre={genre}
        onSelect={handleGenre}
      />
      <SortControl currentSelection={sortBy} onSortChange={handleSortChange} />

      <div className={styles.totalCount}>
        <strong>{orderedMovies.length}</strong> movies found
      </div>

      <div className={styles.appMovieTiles}>
        {orderedMovies.map((movie, index) => (
          <MovieTile
            movie={movie}
            key={index}
            onClick={() => handleMovieClick(movie.id)}
          />
        ))}
      </div>
    </>
  );
};

export default MovieListPage;

MovieListPage.propTypes = {
  genre: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  handleGenre: PropTypes.func.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  orderedMovies: PropTypes.array.isRequired,
};
