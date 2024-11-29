import React from "react";
import PropTypes from "prop-types";
import sortOptions from "../../helpers/sortOptions";
import {
  SortByText,
  ReleaseDateText,
  TitleText,
} from "../../helpers/constants";
import styles from "./styles.module.css";

const SortControl = ({ currentSelection = sortOptions[0], onSortChange }) => {
  const handleChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className={styles.sortControl}>
      <label htmlFor="sort-select">{SortByText}</label>
      <select id="sort-select" className={styles.sortSelect} value={currentSelection} onChange={handleChange}>
        <option className={styles.sortOption} value={sortOptions[0]}>{ReleaseDateText}</option>
        <option className={styles.sortOption} value={sortOptions[1]}>{TitleText}</option>
      </select>
    </div>
  );
};

export default SortControl;

SortControl.propTypes = {
  currentSelection: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
