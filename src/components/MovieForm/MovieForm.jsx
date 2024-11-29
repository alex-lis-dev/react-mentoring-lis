import { PropTypes } from "prop-types";
import React from "react";
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
  MovieForm_Title_Placeholder,
} from "../../helpers/constants";
import styles from "./styles.module.css";
import FormField from "./components/FormField/FormField";
import { Controller, useForm } from "react-hook-form";

const MovieForm = ({ initialMovie, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialMovie?.title || "",
      releaseDate: initialMovie?.release_date || "",
      movieUrl: initialMovie?.poster_path || "",
      rating: initialMovie?.vote_average || "",
      genres: initialMovie?.genres?.join(", ") || "",
      runtime: initialMovie?.runtime || "",
      overview: initialMovie?.overview || "",
    },
  });

  const formFields = [
    {
      name: "title",
      type: "text",
      placeholder: MovieForm_Title_Placeholder,
      label: MovieForm_Title,
      rules: { required: "Title is required" },
    },
    {
      name: "releaseDate",
      type: "date",
      placeholder: MovieForm_ReleaseDate_Placeholder,
      label: MovieForm_ReleaseDate,
      rules: { required: "Release date is required" },
    },
    {
      name: "movieUrl",
      type: "text",
      placeholder: MovieForm_MovieUrl_Placeholder,
      label: MovieForm_MovieUrl,
      rules: { required: "Movie URL is required" },
    },
    {
      name: "rating",
      type: "number",
      placeholder: MovieForm_Rating_Placeholder,
      label: MovieForm_Rating,
      rules: { required: "Rating is required", min: 0, max: 10 },
    },
    {
      name: "genres",
      type: "text",
      placeholder: MovieForm_Genre_Placeholder,
      label: MovieForm_Genre,
      rules: { required: "Genres are required" },
    },
    {
      name: "runtime",
      type: "number",
      placeholder: MovieForm_Runtime_Placeholder,
      label: MovieForm_Runtime,
      rules: { required: "Runtime is required", min: 1 },
    },
    {
      name: "overview",
      type: "textarea",
      placeholder: MovieForm_Overview_Placeholder,
      label: MovieForm_Overview,
      rules: { required: "Overview is required" },
    },
  ];

  return (
    <form name="MovieForm" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.movieForm}>
      {formFields.map((formField) => (
          <Controller
            key={formField.name}
            name={formField.name}
            control={control}
            rules={formField.rules}
            render={({ field }) => (
              <FormField
                inputKey={formField.name}
                type={formField.type}
                placeholder={formField.placeholder}
                labelTitle={formField.label}
                field={field}
                error={errors[formField.name]}
              />
            )}
          />
        ))}
      </div>
      <div className={styles.movieFormButtons}>
        <button
          className={styles.movieFormButtonsReset}
          type="button"
          onClick={() => reset()}
        >
          {MovieForm_Button_RESET}
        </button>
        <button className={styles.movieFormButtonsSubmit} type="submit">
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
