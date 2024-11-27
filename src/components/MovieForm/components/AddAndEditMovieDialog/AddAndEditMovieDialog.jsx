import React from "react";
import Dialog from "../../../Dialog/Dialog";
import MovieForm from "../../MovieForm";
import { AddMovieText } from "../../../../helpers/constants";
import { useNavigate, useOutletContext } from "react-router-dom";
import { createMovie, updateMovie } from "../../../../services";

const AddAndEditMovieDialog = () => {
  const { movie, onMovieUpdate } = useOutletContext();
  const navigate = useNavigate();

  const closeForm = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (formData) => {
    const movieData = {
      title: formData.title,
      vote_average: parseFloat(formData.rating),
      genres: formData.genres.split(", "),
      release_date: formData.releaseDate,
      runtime: parseFloat(formData.runtime),
      poster_path: formData.movieUrl,
      overview: formData.overview,
    };

    if (!movie) {
      await createMovie(movieData);
    } else {
      const updatedMovie = {
        ...movie,
        ...movieData,
        tagline: movie.tagline || " ",
      };
      await updateMovie(updatedMovie);
    }

    onMovieUpdate();
    closeForm();
  };

  return (
    <Dialog title={AddMovieText} onClose={closeForm} active={true}>
      <MovieForm onSubmit={handleFormSubmit} initialMovie={movie} />
    </Dialog>
  );
};

export default AddAndEditMovieDialog;
