import React, { useEffect, useState } from "react";
import Counter from "../Counter/Counter";
import { Outlet, useSearchParams } from "react-router-dom";
import MovieListPage from "../MovieListPage/MovieListPage";
import sortOptions from "../../helpers/sortOptions";
import { getMovies } from "../../services";
import genres from "../../helpers/genres";
import styles from "./styles.module.css";

const Layout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderedMovies, setOrderedMovies] = useState([]);
  const query = searchParams.get("query") || "";
  const genre = searchParams.get("genre") || genres[0];
  const sortBy = searchParams.get("sortBy") || sortOptions[0];
  const [updateFlag, setUpdateFlag] = useState(false);

  const handleSearch = (value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), query: value });
  };

  const handleGenre = (value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), genre: value });
  };

  const handleSortChange = (value) => {
    setSearchParams({ ...Object.fromEntries(searchParams), sortBy: value });
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getMovies(sortBy, query, genre === "All" ? "" : genre, signal)
      .then((response) => setOrderedMovies(response.data))
      .catch((error) => {
        if (error.name !== "AbortError") {
          //console.error("Fetch error:", error.message);
        }
      });

    return () => controller.abort();
  }, [query, genre, sortBy, updateFlag]);

  const handleMovieUpdate = () => {
    setUpdateFlag((prev) => !prev);
  };

  return (
    <>
      <header className={styles.appHeader}>
      <Outlet
          context={{ query, handleSearch, onMoviesUpdate: handleMovieUpdate }}
        />
      </header>
      <div className={styles.appBody}>
        <MovieListPage
          genre={genre}
          sortBy={sortBy}
          handleGenre={handleGenre}
          handleSortChange={handleSortChange}
          orderedMovies={orderedMovies}
        />
      </div>

      <footer className={styles.appFooter}>
        <div className={styles.netflix}>
          <strong>netflix</strong>roulette
        </div>
        <Counter initialValue={13}></Counter>
      </footer>
    </>
  );
};

export default Layout;
