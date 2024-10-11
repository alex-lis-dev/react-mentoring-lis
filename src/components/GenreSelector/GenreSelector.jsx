import React from "react";
import PropTypes from "prop-types";

const GenreSelector = ({
  genres = [
    "All",
    "Action",
    "Mystery",
    "Science Fiction",
    "Thriller",
    "Adventure",
    "Fantasy",
  ],
  selectedGenre = "All",
  onSelect,
}) => {
  return (
    <div>
      {genres.map((genre, index) => (
        <button
          key={index}
          style={{
            margin: "1px",
            backgroundColor: genre === selectedGenre ? "#F65261" : "#424242",
            color: "#FFFFFF",
          }}
          onClick={() => onSelect(genre)}
        >
          {genre}
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
