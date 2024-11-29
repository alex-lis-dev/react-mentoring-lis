import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const ContextMenu = ({ handleEditItemCLick, handleDeleteItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.contextMenu}>
      <button ref={menuRef} onClick={handleMenuClick}>
        ...
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          <li onClick={handleEditItemCLick}>Edit</li>
          <li onClick={handleDeleteItemClick}>Delete</li>
        </ul>
      )}
    </div>
  );
};

export default ContextMenu;

ContextMenu.propTypes = {
  handleEditItemCLick: PropTypes.func,
  handleDeleteItemClick: PropTypes.func,
};
