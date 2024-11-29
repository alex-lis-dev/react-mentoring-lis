import React from "react";
import {
  AddMovieButtonText,
  SearchForm_Placeholder,
} from "../../helpers/constants";
import Search from "../Search/Search";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

const SearchContainer = ({ children, query, handleSearch }) => {
  const router = useRouter();

  return (
    <div className={styles.searchContainer}>
      <div className={styles.blurEffect}></div>
      <div className={styles.content}>
        <div>
          <button
            className={styles.addMovieButton}
            onClick={() => router.push(`/new`)}
          >
            {AddMovieButtonText}
          </button>
          {children}
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
