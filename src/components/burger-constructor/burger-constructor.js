import PropTypes from 'prop-types';
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor(props) {
  return (
    <section className='mt-25'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="ml-8">
        {props.ingredients.map((ingredient, index) => {
          let ingredientType = null;
          if (index === 0) ingredientType = "top";
          if (index === props.ingredients.length-1) ingredientType = "bottom";
          return(
            <ConstructorElement
              type={ingredientType}
              isLocked={ingredientType !== null ? true : false}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          )
        })}
      </div>
      <div className={burgerConstructor.total}>
        <span className="text text_type_digits-medium">610</span>
        <CurrencyIcon />
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
};

export default BurgerConstructor;