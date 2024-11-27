import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { getMovie } from "../../services.js";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [updateFlag, setUpdateFlag] = useState(false);
  const { onMoviesUpdate } = useOutletContext();

  useEffect(() => {
    getMovie(movieId)
      .then(setMovie)
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [movieId, updateFlag]);

  const handleMovieUpdate = () => {
    setUpdateFlag((prev) => !prev);
    onMoviesUpdate();
  };

  return movie ? (
    <div className={styles.movieDetails}>
      <Outlet context={{ movie, onMovieUpdate: handleMovieUpdate }} />
      <button
        className={styles.searchButton}
        onClick={() => navigate(`/${location.search}`)}
      >
        Search
      </button>
      <img src={movie.poster_path} alt={movie.title} className={styles.moviePoster} />
      <div className={styles.movieInfo}>
        <h2>{movie.title}</h2>
        <p>{new Date(movie.release_date).getFullYear()}</p>
        <p>{movie.vote_average}</p>
        <p>{movie.runtime}</p>
        <p>{movie.overview}</p>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MovieDetails;
