import { PropTypes } from "prop-types";
import React, { useState } from "react";
import {
  MovieForm_Button_RESET,
  MovieForm_Button_Submit,
  MovieForm_Genre,
  MovieForm_Genre_Placeholder,
  MovieForm_MovieUrl,
  MovieForm_MovieUrl_Placeholder,
  MovieForm_Overview,
  MovieForm_Overview_Placeholder,
  MovieForm_Rating,
  MovieForm_Rating_Placeholder,
  MovieForm_ReleaseDate,
  MovieForm_ReleaseDate_Placeholder,
  MovieForm_Runtime,
  MovieForm_Runtime_Placeholder,
  MovieForm_Title,
} from "../../helpers/constants";
import "./MovieForm.css";
import { MovieForm_Title_Placeholder } from "../../helpers/constants";
import FormField from "./components/FormField/FormField";

const MovieForm = ({ initialMovie, onSubmit }) => {
  const mapInitialMovieFields = {
    title: initialMovie && initialMovie.title ? initialMovie.title : "",
    releaseDate:
      initialMovie && initialMovie.release_date
        ? initialMovie.release_date
        : "",
    movieUrl:
      initialMovie && initialMovie.poster_path ? initialMovie.poster_path : "",
    rating:
      initialMovie && initialMovie.vote_average
        ? initialMovie.vote_average
        : "",
    genres:
      initialMovie && initialMovie.genres ? initialMovie.genres.join(", ") : "",
    runtime: initialMovie && initialMovie.runtime ? initialMovie.runtime : "",
    overview:
      initialMovie && initialMovie.overview ? initialMovie.overview : "",
  };

  const [formData, setFormData] = useState(mapInitialMovieFields);

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(mapInitialMovieFields);
  };

  return (
    <form name="MovieForm" onSubmit={handleSubmit}>
      <div className="movie-form">
        <FormField
          inputKey="title"
          type="text"
          initialValue={formData.title}
          placeholder={MovieForm_Title_Placeholder}
          labelTitle={MovieForm_Title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <FormField
          inputKey="releaseDate"
          type="date"
          initialValue={formData.releaseDate}
          placeholder={MovieForm_ReleaseDate_Placeholder}
          labelTitle={MovieForm_ReleaseDate}
          onChange={(e) => handleChange("releaseDate", e.target.value)}
        />
        <FormField
          inputKey="movieUrl"
          type="text"
          initialValue={formData.movieUrl}
          placeholder={MovieForm_MovieUrl_Placeholder}
          labelTitle={MovieForm_MovieUrl}
          onChange={(e) => handleChange("movieUrl", e.target.value)}
        />
        <FormField
          inputKey="rating"
          type="number"
          initialValue={formData.rating}
          placeholder={MovieForm_Rating_Placeholder}
          labelTitle={MovieForm_Rating}
          onChange={(e) => handleChange("rating", e.target.value)}
        />
        <FormField
          inputKey="genres"
          type="text"
          initialValue={formData.genres}
          placeholder={MovieForm_Genre_Placeholder}
          labelTitle={MovieForm_Genre}
          onChange={(e) => handleChange("genres", e.target.value)}
        />
        <FormField
          inputKey="runtime"
          type="number"
          initialValue={formData.runtime}
          placeholder={MovieForm_Runtime_Placeholder}
          labelTitle={MovieForm_Runtime}
          onChange={(e) => handleChange("runtime", e.target.value)}
        />
      </div>
      <FormField
        inputKey="overview"
        type="textarea"
        initialValue={formData.overview}
        placeholder={MovieForm_Overview_Placeholder}
        labelTitle={MovieForm_Overview}
        onChange={(e) => handleChange("overview", e.target.value)}
      />
      <div className="movie-form-buttons">
        <button
          className="movie-form-buttons-reset"
          type="button"
          onClick={handleReset}
        >
          {MovieForm_Button_RESET}
        </button>
        <button className="movie-form-buttons-submit" type="submit">
          {MovieForm_Button_Submit}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;

MovieForm.propTypes = {
  initialMovie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    runtime: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.array.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};
