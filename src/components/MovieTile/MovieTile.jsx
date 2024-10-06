import React from 'react';
import PropTypes from 'prop-types';

const MovieTile = ({ imageUrl, name, releaseYear, genres, onClick })=> {
    return (
      <div onClick={onClick}>
        <img src={imageUrl} alt={name} className="movie-poster"/>
        <h2>{name}</h2>
        <p>{releaseYear}</p>
        <p>{genres.join(', ')}</p>
      </div>
    );
  };

  export default MovieTile;

  MovieTile.propTypes = {
    onClick: PropTypes.func,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    releaseYear: PropTypes.number,
    genres: PropTypes.array
  };
  
  MovieTile.defaultProps = {
    imageUrl: null,
    name: null,
    releaseYear: null,
    genres: null
  };