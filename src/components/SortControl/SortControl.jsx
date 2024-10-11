import React from "react";
import PropTypes from "prop-types";
import sortOptions from "../../helpers/sortOptions";
import {
  SortByText,
  ReleaseDateText,
  TitleText,
} from "../../helpers/constants";

const SortControl = ({ currentSelection = sortOptions[0], onSortChange }) => {
  const handleChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="sort-control">
      <label>{SortByText}</label>
      <select value={currentSelection} onChange={handleChange}>
        <option value={sortOptions[0]}>{ReleaseDateText}</option>
        <option value={sortOptions[1]}>{TitleText}</option>
      </select>
    </div>
  );
};

export default SortControl;

SortControl.propTypes = {
  currentSelection: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
