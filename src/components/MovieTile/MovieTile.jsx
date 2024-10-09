import React from 'react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const MovieTile = ({ imageUrl, name, releaseDate, genres, onClick })=> {

  const releaseYear = useMemo(() => new Date(releaseDate).getFullYear(), [releaseDate]);
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
    releaseDate: PropTypes.string,
    genres: PropTypes.array
  };
  
  MovieTile.defaultProps = {
    imageUrl: null,
    name: null,
    releaseYear: null,
    genres: null
  };