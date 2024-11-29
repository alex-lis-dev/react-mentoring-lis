import React from "react";
import { useRouter } from "next/router";
import Counter from "../Counter/Counter";
import MovieListPage from "../MovieListPage/MovieListPage";
import styles from "./styles.module.css";

const Layout = ({ children, orderedMovies }) => {
  const router = useRouter();
  const { query, genre, sortBy } = router.query;
  const handleSearch = (value) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, query: value },
    });
  };

  const handleGenre = (value) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, genre: value },
    });
  };

  const handleSortChange = (value) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sortBy: value },
    });
  };
  
  return (
    <>
      <header className={styles.appHeader}>
        {children}
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
