import React, { useState } from "react";
import PropTypes from "prop-types";
import "./GenreSelector.css";

const GenreSelector = ({ genres, selectedGenre = "All", onSelect }) => {
  const [currentGenre, setCurrentGenre] = useState(selectedGenre);
  const handleGenreClick = (genre) => {
    setCurrentGenre(genre);
    onSelect(genre);
  };
  return (
    <div className="genre-selector-container">
      {genres.map((genre) => (
        <button
          key={genre}
          className={genre === currentGenre ? "active" : ""}
          onClick={() => handleGenreClick(genre)}
        >
          {genre.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

GenreSelector.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedGenre: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default GenreSelector;
