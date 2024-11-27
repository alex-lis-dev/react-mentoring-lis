import React from "react";
import {
  AddMovieButtonText,
  SearchForm_Placeholder,
} from "../../helpers/constants";
import Search from "../Search/Search";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./styles.module.css";

const SearchContainer = () => {
  const { query, handleSearch, onMoviesUpdate } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className={styles.searchContainer}>
      <div className={styles.blurEffect}></div>
      <div className={styles.content}>
        <div>
          <button
            className={styles.addMovieButton}
            onClick={() => navigate(`/new`)}
          >
            {AddMovieButtonText}
          </button>
          <Outlet context={{ movie: null, onMovieUpdate: onMoviesUpdate }} />
        </div>
        <Search
          placeholder={SearchForm_Placeholder}
          initialQuery={query}
          onSearch={handleSearch}
        ></Search>
      </div>
    </div>
  );
};

export default SearchContainer;
