import React from 'react';

const MovieTile = ({ imageUrl, name, releaseYear, genres, onClick }) => {
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