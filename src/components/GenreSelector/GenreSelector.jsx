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
      {genres.map((genre, index) => (
        <button
          key={index}
          style={{
            backgroundColor: "#232323",
            color: "#FFFFFF",
            "border-bottom":
              "3px solid " + (genre === currentGenre ? "#F65261" : "#424242"),
          }}
          onClick={() => handleGenreClick(genre)}
        >
          {genre.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default GenreSelector;

GenreSelector.propTypes = {
  genres: PropTypes.array,
  selectedGenre: PropTypes.string,
  onSelect: PropTypes.func,
};
