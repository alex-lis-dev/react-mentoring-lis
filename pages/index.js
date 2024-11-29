import React from "react";
import SearchContainer from "../src/components/SearchContainer/SearchContainer";
import Layout from "../src/components/Layout/Layout";
import { getMovies } from "../src/services";
import genres from "../src/helpers/genres";
import sortOptions from "../src/helpers/sortOptions";
import styles from "../src/styles.module.css";
import { useRouter } from "next/router";


export default function Home({ orderedMovies, initialQuery }) {
  const router = useRouter();
  const handleSearch = (value) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, query: value },
    });
  };
  return (
    <div className={styles.app}>
      <Layout orderedMovies={orderedMovies}>
        <SearchContainer query={initialQuery} handleSearch={handleSearch}/>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query, genre, sortBy } = context.query;
  const fetchedGenre = genre || genres[0];
  const fetchedSortBy = sortBy || sortOptions[0];
  const fetchedQuery = query || '';
  
  const moviesData = await getMovies(
    fetchedSortBy,
    fetchedQuery,
    fetchedGenre === "All" ? "" : fetchedGenre
  );

  return {
    props: {
      orderedMovies: moviesData.data,
      initialQuery: query || "",
      initialGenre: fetchedGenre,
      initialSortBy: fetchedSortBy,
    },
  };
}
