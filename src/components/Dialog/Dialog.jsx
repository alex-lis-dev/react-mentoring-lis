import React from "react";
import { Portal } from "react-portal";
import FocusTrap from "focus-trap-react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const Dialog = ({ title, children, active, onClose }) => {
  return (
    active && (
      <Portal>
        <FocusTrap>
          <div className={styles.dialogBackdrop}>
            <div role="dialog" className={styles.dialog}>
              <div className={styles.dialogHeader}>
                <p>{title}</p>
                <button onClick={onClose}>&times;</button>
              </div>
              <div className={styles.dialogBody}>{children}</div>
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
  active: PropTypes.bool,
};
