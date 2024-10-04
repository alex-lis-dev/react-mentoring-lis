import React, { useState } from "react";

function Search(props) {
  const [query, setQuery] = useState(props.initialQuery);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(query);
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
