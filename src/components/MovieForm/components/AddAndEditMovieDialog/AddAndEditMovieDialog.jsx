import React from "react";
import Dialog from "../../../Dialog/Dialog";
import MovieForm from "../../MovieForm";
import { AddMovieText } from "../../../../helpers/constants";
import PropTypes from "prop-types";

const AddAndEditMovieDialog = ({ isOpen, onClose, movieToEdit }) => {
  
  const handleFormSubmit = () => {
    onClose();
  };

  return (
    <Dialog title={AddMovieText} onClose={onClose} active={isOpen}>
      <MovieForm onSubmit={handleFormSubmit} initialMovie={movieToEdit} />
    </Dialog>
  );
};

export default AddAndEditMovieDialog;

AddAndEditMovieDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movieToEdit: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    runtime: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.array.isRequired,
  }),
};
