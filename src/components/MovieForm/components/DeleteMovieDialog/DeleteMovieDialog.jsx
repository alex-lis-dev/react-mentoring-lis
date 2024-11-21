import React from "react";
import Dialog from "../../../Dialog/Dialog";
import PropTypes from "prop-types";
import {
  DeleteMovie_Title,
  DeleteMovieConfirmationQuestion,
  DeleteMovieConfirm,
} from "../../../../helpers/constants";

const DeleteMovieDialog = ({ isOpen, onClose, movieToDelete }) => {
  const handleDeleteMovie = () => {
    onClose();
  };

  return (
    <Dialog title={DeleteMovie_Title} onClose={onClose} active={isOpen}>
      <div>
        {DeleteMovieConfirmationQuestion}
        <button onClick={handleDeleteMovie}>{DeleteMovieConfirm}</button>
      </div>
    </Dialog>
  );
};
export default DeleteMovieDialog;

DeleteMovieDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  movieToDelete: PropTypes.shape({
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
