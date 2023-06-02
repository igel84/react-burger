import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './card.module.css'

export default function Card(props) {
  const {_id, image, name, price, type} = props.ingredient

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: { _id },
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });

  const { constructorIngredients } = useSelector(store => ({
    constructorIngredients: store.order.constructorIngredients
  }));

  const count = React.useMemo(() => {
    const ingrLen = constructorIngredients.filter(item => item._id === _id).length
    return type === "bun" ? ingrLen * 2 : ingrLen
  }, [constructorIngredients, _id, type]);

  return (
    <div className={style.card} onClick={props.onCardClick} ref={dragRef}>
      <img src={image} alt={name} className="ml-4 mr-4 mb-1" />
      {count > 0 && <Counter count={count} size="default" extraClass="m-1 counter" />}
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