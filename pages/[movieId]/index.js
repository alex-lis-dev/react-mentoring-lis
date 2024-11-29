import React from "react";
import Layout from "../../src/components/Layout/Layout";
import MovieDetails from "../../src/components/MovieDetails/MovieDetails";
import styles from "../../src/styles.module.css";
import genres from "../../src/helpers/genres";
import sortOptions from "../../src/helpers/sortOptions";
import { getMovie, getMovies } from "../../src/services";

export default function Details({ orderedMovies, movie }) {
  return (
    <div className={styles.app}>
      <Layout orderedMovies={orderedMovies}>
        <MovieDetails movie={movie} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query, genre, sortBy } = context.query;
  const { movieId } = context.params;
  const fetchedGenre = genre || genres[0];
  const fetchedSortBy = sortBy || sortOptions[0];
  const fetchedQuery = query || '';
  const moviesData = await getMovies(
    fetchedSortBy,
    fetchedQuery,
    fetchedGenre === "All" ? "" : fetchedGenre
  );

  const movie = await getMovie(movieId);

  return {
    props: {
      orderedMovies: moviesData.data,
      movie: movie
    },
  };
}
