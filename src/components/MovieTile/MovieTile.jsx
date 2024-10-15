import React from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import ContextMenu from "./components/ContextMenu.jsx";

const MovieTile = ({ id, imageUrl, name, releaseDate, genres, onClick, onEditClick, onDeleteClick}) => {
  const releaseYear = useMemo(
    () => new Date(releaseDate).getFullYear(),
    [releaseDate]
  );
  
  return (
    <>
    <div>
      <ContextMenu id={id} handleEditItemCLick={onEditClick} handleDeleteItemClick={onDeleteClick}></ContextMenu>
      </div>
      <div onClick={onClick}>
        <img src={imageUrl} alt={name} className="movie-poster" />
        <h2>{name}</h2>
        <p>{releaseYear}</p>
        <p>{genres.join(", ")}</p>
      </div>
    </>
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
  id: PropTypes.number
};

MovieTile.defaultProps = {
  imageUrl: null,
  name: null,
  releaseYear: null,
  genres: null,
};
