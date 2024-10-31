import React, { useState } from "react";
import {
  AddMovieButtonText,
  SearchForm_Placeholder,
} from "../../helpers/constants";
import Search from "../Search/Search";
import AddAndEditMovieDialog from "../MovieForm/components/AddAndEditMovieDialog/AddAndEditMovieDialog";
import { useOutletContext } from "react-router-dom";
const SearchContainer = () => {
  const { query, handleSearch } = useOutletContext();
  const [isAddMovieDialogOpen, setIsAddMovieDialogOpen] = useState(false);

  const toggleDialog = () => setIsAddMovieDialogOpen(!isAddMovieDialogOpen);

  return (
    <div className="search-container">
      <div className="blur-effect"></div>
      <div className="content">
        <div>
          <button className="add-movie-button" onClick={toggleDialog}>
            {AddMovieButtonText}
          </button>
          <AddAndEditMovieDialog
            isOpen={isAddMovieDialogOpen}
            onClose={toggleDialog}
          />
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
