import React from 'react'
import PropTypes from 'prop-types'
import style from './modal-overlay.module.css'

export default function ModalOverlay(props) {
  return (
      <div className={style.bg} onClick={props.onBgClick}>
        {props.children}
      </div>
    )
}

ModalOverlay.propTypes = {
  children: PropTypes.array,
  onBgClick: PropTypes.func
};