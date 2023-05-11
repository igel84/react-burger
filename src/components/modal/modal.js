import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import style from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modals");
  
export default function Modal(props) {

  const { children, header, onClose, onNothing } = props;

  React.useEffect(() => {
    const escFunction = e => {
      if (e.key === "Escape") {
        onClose();
      }
    }
  
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ReactDom.createPortal(
    (
      <ModalOverlay onBgClick={onClose}>
        <div onClick={onNothing} className={style.modal}>
          <div className={style.header}>
            <span className="text text_type_main-large">{header}</span>
            <CloseIcon type="primary" onClick={onClose} />
          </div>
          <div className={style.body}>
            {children}
          </div>
        </div>
      </ModalOverlay>
    ),
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.object,
  header: PropTypes.string,
  onClose: PropTypes.func,
  onNothing: PropTypes.func
};