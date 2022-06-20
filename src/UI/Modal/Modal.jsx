import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

function Modal({children, show, close}) {
  return (
    <>
      <Backdrop show={show}/>
     <div onClick={(e) => e.stopPropagation()} className={`modalwindow${show ? " on" : ""}`}>
          {children}
          <button className='modal__btn' onClick={close}>Start game</button>
     </div>
    </>
  );
}

export default Modal
