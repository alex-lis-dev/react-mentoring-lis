import React from 'react';
import './MovieDetails.css'

const MovieDetails = ({ movie }) => {
    return (
      movie ?
      <div className="movie-details">
      <img src={movie.poster_path} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>{new Date(movie.release_date).getFullYear()}</p>
          <p>{movie.vote_average}</p>
          <p>{movie.runtime}</p>
          <p>{movie.overview}</p>
        </div>
      </div>
      : ''
    );
  };

  export default MovieDetails;