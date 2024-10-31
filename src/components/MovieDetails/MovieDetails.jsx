import React from "react";
import "./MovieDetails.css";
import PropTypes from "prop-types";

const MovieDetails = ({ movie, onSearchClick}) => {
  return (
    <div className="movie-details">
      <button className="searchButton" onClick={onSearchClick}>
        Search
      </button>
      <img src={movie.poster_path} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>{new Date(movie.release_date).getFullYear()}</p>
        <p>{movie.vote_average}</p>
        <p>{movie.runtime}</p>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    runtime: PropTypes.number,
    overview: PropTypes.string,
  }),
  onSearchClick: PropTypes.func.isRequired,
};
