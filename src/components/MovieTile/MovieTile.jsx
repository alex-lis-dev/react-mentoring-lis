import React from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import ContextMenu from "./components/ContextMenu.jsx";
import "./MovieTile.css";

const MovieTile = ({
  id,
  imageUrl,
  name,
  releaseDate,
  genres,
  onClick,
  onEditClick,
  onDeleteClick,
}) => {
  const releaseYear = useMemo(
    () => new Date(releaseDate).getFullYear(),
    [releaseDate]
  );

  return (
    <div className="movie-tile-container">
      <div>
        <ContextMenu
          id={id}
          handleEditItemCLick={onEditClick}
          handleDeleteItemClick={onDeleteClick}
        ></ContextMenu>
      </div>
      <div onClick={onClick}>
        <img src={imageUrl} alt={name} className="movie-poster" />
        <div className="movie-name">{name}</div>
        <div className="movie-year">{releaseYear}</div>
        <div className="movie-genres">{genres.join(", ")}</div>
      </div>
    </div>
  );
};

export default MovieTile;

MovieTile.propTypes = {
  onClick: PropTypes.func,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  releaseDate: PropTypes.string,
  genres: PropTypes.array,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  id: PropTypes.number,
};
