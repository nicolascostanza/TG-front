import React from 'react';
import style from '../Modal/modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  } else {
    return (
      <div className={style.container}>
        <div className={style.boxContainer}>
          <p className={style.message}>{props.message}</p>
          <div className={style.btnBox}>
            <button className={style.btn} onClick={props.close}>
              close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Modal;
