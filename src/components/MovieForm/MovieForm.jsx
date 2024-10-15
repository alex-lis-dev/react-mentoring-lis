import { PropTypes } from "prop-types";
import React from "react";
import {
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

const MovieForm = ({ initialMovie, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const movieData = Object.fromEntries(formData);
    onSubmit(movieData);
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="movie-form">
      <div className="form-field">
        <label htmlFor="title">{MovieForm_Title}</label>
        <input
          value={initialMovie ? initialMovie.title : ""}
          name="title"
          id="title"
          type="text"
          placeholder={MovieForm_Title_Placeholder}
        />
      </div>
      <div className="form-field">
        <label htmlFor="releaseDate">{MovieForm_ReleaseDate}</label>
        <input
          value={initialMovie ? initialMovie.release_date : ""}
          name="releaseDate"
          id="releaseDate"
          type="date"
          placeholder={MovieForm_ReleaseDate_Placeholder}
        />
      </div>
      <div className="form-field">
        <label htmlFor="movieUrl">{MovieForm_MovieUrl}</label>
        <input
          value={initialMovie ? initialMovie.poster_path : ""}
          name="movieUrl"
          id="movieUrl"
          type="text"
          placeholder={MovieForm_MovieUrl_Placeholder}
        />
      </div>
      <div className="form-field">
        <label htmlFor="rating">{MovieForm_Rating}</label>
        <input
          value={initialMovie ? initialMovie.vote_average : ""}
          name="rating"
          id="rating"
          type="number"
          placeholder={MovieForm_Rating_Placeholder}
        />
      </div>
      <div className="form-field">
        <label htmlFor="genre">{MovieForm_Genre}</label>
        <input
          value={initialMovie ? initialMovie.genres : ""}
          name="genre"
          id="genre"
          type="text"
          placeholder={MovieForm_Genre_Placeholder}
        />
      </div>
      <div className="form-field">
        <label htmlFor="runtime">{MovieForm_Runtime}</label>
        <input
          value={initialMovie ? initialMovie.runtime : ""}
          name="runtime"
          id="runtime"
          type="number"
          placeholder={MovieForm_Runtime_Placeholder}
        />
      </div>
      </div>
      <div className="form-field">
        <label htmlFor="overview">{MovieForm_Overview}</label>
        <textarea 
          value={initialMovie ? initialMovie.overview : ""}
          name="overview"
          id="overview"
          placeholder={MovieForm_Overview_Placeholder}
        />
      </div>
      <div>
        <button>{"RESET"}</button>
        <button type="submit">{"SUBMIT"}</button>
      </div>
    </form>
  );
};

export default MovieForm;

MovieForm.propTypes = {
  initialMovie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    runtime: PropTypes.number.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
  }),
  onSubmit: PropTypes.func,
};
