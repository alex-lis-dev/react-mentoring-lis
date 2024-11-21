import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import ContextMenu from "./components/ContextMenu.jsx";
import "./MovieTile.css";
import DeleteMovieDialog from "../MovieForm/components/DeleteMovieDialog/DeleteMovieDialog.jsx";
import { useNavigate } from "react-router-dom";

const MovieTile = ({ movie, onClick }) => {
  const releaseYear = useMemo(
    () => new Date(movie.release_date).getFullYear(),
    [movie.release_date]
  );
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toggleDeleteDialog = () => setIsDeleteDialogOpen(!isDeleteDialogOpen);

  const onEditClick = () => navigate(`/${movie.id}/edit`);
  const onDeleteClick = () => toggleDeleteDialog();

  return (
    <div className="movie-tile-container">
      <div>
        <ContextMenu
          id={movie.id}
          handleEditItemCLick={onEditClick}
          handleDeleteItemClick={onDeleteClick}
        />
      </div>
      <DeleteMovieDialog
        isOpen={isDeleteDialogOpen}
        onClose={toggleDeleteDialog}
        movieToDelete={movie}
      />
      <div onClick={onClick}>
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-name">{movie.title}</div>
        <div className="movie-year">{releaseYear}</div>
        <div className="movie-genres">{movie.genres.join(", ")}</div>
      </div>
    </div>
  );
};

export default MovieTile;

MovieTile.propTypes = {
  onClick: PropTypes.func,
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    runtime: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.array.isRequired,
  }),
};
