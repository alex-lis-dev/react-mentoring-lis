import React from "react";
import SearchContainer from "../src/components/SearchContainer/SearchContainer";
import Layout from "../src/components/Layout/Layout";
import { getMovies } from "../src/services";
import genres from "../src/helpers/genres";
import sortOptions from "../src/helpers/sortOptions";
import styles from "../src/styles.module.css";

export default function Home({ orderedMovies, initialQuery }) {
  return (
    <div className={styles.app}>
      <Layout orderedMovies={orderedMovies}>
        <SearchContainer query={initialQuery} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query, genre, sortBy } = context.query;
  const fetchedGenre = genre || genres[0];
  const fetchedSortBy = sortBy || sortOptions[0];
  const moviesData = await getMovies(
    fetchedSortBy,
    query,
    fetchedGenre === "All" ? "" : fetchedGenre
  );

  console.log(moviesData);

  return {
    props: {
      orderedMovies: moviesData.data || [],
      initialQuery: query || "",
      initialGenre: fetchedGenre,
      initialSortBy: fetchedSortBy,
    },
  };
}
