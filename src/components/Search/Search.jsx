import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({initialQuery, onSearch}) =>  {
  const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleSubmit}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;

Search.propTypes = {
  initialQuery: PropTypes.string,
  onSearch: PropTypes.func
};

Search.defaultProps = {
  initialQuery: "What do you want?"
};
