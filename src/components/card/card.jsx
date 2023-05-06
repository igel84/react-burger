import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './card.module.css'

function Card(props) {
  const {image, name, price} = props.ingredient
  return (
    <div className={style.card} onClick={props.onCardClick}>
      <img src={image} alt={name} className="ml-4 mr-4 mb-1" />
      <Counter count={1} size="default" extraClass="m-1 counter" />
      <div className={style.price}>
        <span className="text text_type_digits-default mr-2">{price}</span>
        <CurrencyIcon />
      </div>
      <h5 className="text text_type_main-default mt-1">{name}</h5>
    </div>
  )
}

Card.propTypes = {
  ingredient: PropTypes.object
};

export default Card