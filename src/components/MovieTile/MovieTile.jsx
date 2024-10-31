import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import ContextMenu from "./components/ContextMenu.jsx";
import "./MovieTile.css";
import AddAndEditMovieDialog from "../MovieForm/components/AddAndEditMovieDialog/AddAndEditMovieDialog.jsx";
import DeleteMovieDialog from "../MovieForm/components/DeleteMovieDialog/DeleteMovieDialog.jsx"; 

const MovieTile = ({
  movie,
  onClick,
}) => {
  const releaseYear = useMemo(
    () => new Date(movie.release_date).getFullYear(),
    [movie.release_date]
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const toggleEditDialog = () => setIsEditDialogOpen(!isEditDialogOpen);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toggleDeleteDialog = () => setIsDeleteDialogOpen(!isDeleteDialogOpen);

  const onEditClick = () => toggleEditDialog();
  const onDeleteClick = () => toggleDeleteDialog();

  return (
    <div className="movie-tile-container">
      <div>
        <ContextMenu
          id={movie.id}
          handleEditItemCLick={onEditClick}
          handleDeleteItemClick={onDeleteClick}
        ></ContextMenu>
      </div>
      <AddAndEditMovieDialog isOpen={isEditDialogOpen} onClose={toggleEditDialog} movieToEdit={movie}/>
      <DeleteMovieDialog isOpen={isDeleteDialogOpen} onClose={toggleDeleteDialog} movieToDelete={movie}/>
      <div onClick={onClick}>
        <img src={movie.poster_path} alt={movie.title} className="movie-poster" />
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
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    runtime: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.array.isRequired,
  })
};
