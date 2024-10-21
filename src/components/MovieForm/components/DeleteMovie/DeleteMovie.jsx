import PropTypes from "prop-types";
import React from "react";
import {
  DeleteMovieConfirmationQuestion,
  DeleteMovieConfirm,
} from "../../../../helpers/constants";

const DeleteMovie = ({ deleteMovieCLick }) => {
  return (
    <div>
      {DeleteMovieConfirmationQuestion}
      <button onClick={deleteMovieCLick}>{DeleteMovieConfirm}</button>
    </div>
  );
};

export default DeleteMovie;

DeleteMovie.propTypes = {
  deleteMovieCLick: PropTypes.func.isRequired,
};
