/* Labels, inputs, buttons, cancel button */
import React from 'react';
import styles from './form.module.css';
import Modal from '../Modal';
import Button from '../Button';

const Form = ({ children, title, handleSubmit, showModal, handleClose }) => {
  return (
    <Modal showModal={showModal} handleClose={handleClose} modalTitle="">
      <form className={styles.form}>
        <div>
          <div>
            <h2> {title} </h2>
          </div>
          <div className={styles.inputs}> {children} </div>
          <Button
            id="saveTimesheet"
            onClick={handleSubmit}
            width={'100px'}
            height={'25px'}
            fontSize={'15px'}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Form;
