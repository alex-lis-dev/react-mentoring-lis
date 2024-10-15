import React from "react";

const DeleteMovie = ({ deleteMovieCLick }) => {
  return (
    <div>
      {"Are you sure you want to delete this movie?"}
      <button onClick={deleteMovieCLick}>{"CONFIRM"}</button>
    </div>
  );
};

export default DeleteMovie;
