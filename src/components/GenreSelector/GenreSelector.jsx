import React from "react";

const GenreSelector = ({ genres, selectedGenre, onSelect }) => {
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
