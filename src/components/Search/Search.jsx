import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { Search_Header_Text, SearchForm_Button_Search } from "../../helpers/constants";

const Search = ({ initialQuery, placeholder, onSearch }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div>{Search_Header_Text}</div>
      <input
        data-testid="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button type="submit">{SearchForm_Button_Search}</button>
    </form>
  );
};

export default Search;

Search.propTypes = {
  initialQuery: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
