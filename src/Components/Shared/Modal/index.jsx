import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, showModal, handleClose, modalTitle }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <p>{modalTitle}</p>
          <i className="fa-solid fa-xmark" onClick={() => handleClose()}></i>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
