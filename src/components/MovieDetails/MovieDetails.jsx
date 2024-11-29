import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router.js";
import Link from "next/link";

const MovieDetails = ({ movie }) => {
  const router = useRouter();
  const { movieId, ...otherQueries } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.movieDetails}>
      <Link className={styles.searchButton} href={"/"} passHref>
        Search
      </Link>
      <img
        src={movie.poster_path}
        alt={movie.title}
        className={styles.moviePoster}
      />
      <div className={styles.movieInfo}>
        <h2>{movie.title}</h2>
        <p>{new Date(movie.release_date).getFullYear()}</p>
        <p>{movie.vote_average}</p>
        <p>{movie.runtime}</p>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
