/* Labels, inputs, buttons, cancel button */
import React from 'react';
import styles from './form.module.css';
import Modal from '../Modal';

const Form = ({ children, title, handleSubmit, showModal, handleClose }) => {
  return (
    <Modal showModal={showModal} handleClose={handleClose} modalTitle="">
      <form className={styles.form}>
        <div>
          <div>
            <h2>{title}</h2>
          </div>
          <div className={styles.inputs}> {children} </div>
          <button className={styles.button} id="saveTimesheet" onClick={handleSubmit}>
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
