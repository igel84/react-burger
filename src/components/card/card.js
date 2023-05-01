import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cardStyle from './card.module.css'

function Card(props) {
  return (
    <div className={cardStyle.card}>
      <img src={props.image} alt={props.name} className="ml-4 mr-4 mb-1" />
      <Counter count={1} size="default" extraClass="m-1 counter" />
      <div className={cardStyle.price}>
        <span className="text text_type_digits-default mr-2">{props.price}</span>
        <CurrencyIcon />
      </div>
      <h5 className="text text_type_main-default mt-1">{props.name}</h5>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
};

export default Card