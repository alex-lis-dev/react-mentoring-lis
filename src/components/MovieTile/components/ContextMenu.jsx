import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import "./ContextMenu.css"

const ContextMenu = ({handleEditItemCLick, handleDeleteItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button ref={menuRef} onClick={handleMenuClick}>...</button>
      {isOpen && (
        <ul className="menu">
          <li onClick={handleEditItemCLick}>Edit</li>
          <li onClick={handleDeleteItemClick}>Delete</li>
        </ul>
      )}
    </div>
  );
};

ContextMenu.propTypes = {
  id: PropTypes.number.isRequired, 
  handleEditItemCLick: PropTypes.func.isRequired, 
  handleDeleteItemClick: PropTypes.func.isRequired
};

ContextMenu.defaultProps = {
  id: null,
  handleEditItemCLick: () => console.warn('Edit Click not implemented'),
  handleDeleteItemClick: () => console.warn('Delete Click not implemented')
};

export default ContextMenu;
