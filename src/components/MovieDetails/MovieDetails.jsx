import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovie } from "../../services.js";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie(movieId)
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [movieId]);

  return movie ? (
    <div className="movie-details">
      <button
        className="searchButton"
        onClick={() => navigate(`/${location.search}`)}
      >
        Search
      </button>
      <img src={movie.poster_path} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
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
