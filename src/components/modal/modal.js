import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import style from './modal.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById("react-modals");
  
class Modal extends React.Component {
  render() {
    const { children, header, onClose, onNothing } = this.props;

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
}

Modal.propTypes = {
  children: PropTypes.array,
  header: PropTypes.string,
  onClose: PropTypes.func,
  onNothing: PropTypes.func
};

export default Modal