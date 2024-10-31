import React from "react";
import { Portal } from "react-portal";
import FocusTrap from "focus-trap-react";
import "./Dialog.css";
import PropTypes from "prop-types";

const Dialog = ({ title, children, active, onClose }) => {
  return (
    active && (
      <Portal>
        <FocusTrap>
          <div className="dialog-backdrop">
            <div role="dialog" className="dialog">
              <div className="dialog-header">
                <p>{title}</p>
                <button onClick={onClose}>&times;</button>
              </div>
              <div className="dialog-body">{children}</div>
            </div>
          </div>
        </FocusTrap>
      </Portal>
    )
  );
};

export default Dialog;

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};
