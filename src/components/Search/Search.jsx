import React from "react";
import PropTypes from "prop-types";

const Search = ({ initialQuery = null, placeholder, onSearch }) => {
  //const [query, setQuery] = useState(initialQuery);

  const handleInputChange = (e) => {
    //setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(initialQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={initialQuery}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;

Search.propTypes = {
  initialQuery: PropTypes.string,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
};
