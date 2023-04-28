import PropTypes from 'prop-types';
import burgerConstructor from './burger-constructor.module.css'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor(props) {
  const bun = props.ingredients.find((ingredient) => ingredient.type === 'bun');
  return (
    <section className='mt-25'>
      <div className={burgerConstructor.list}>        
        <ConstructorElement
          key={`${bun._id}_topbun`}
          type={'top'}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        <div className={burgerConstructor.inputs}>
          {props.ingredients.filter((ingredient) => ingredient.type !== 'bun').map((ingredient) => {
            return(
              <div key={`${ingredient._id}_bun`}>
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.5 6.15375C10.5 7.34325 9.60455 8.3075 8.5 8.3075C7.39545 8.3075 6.5 7.34325 6.5 6.15375C6.5 4.96427 7.39545 4 8.5 4C9.60455 4 10.5 4.96427 10.5 6.15375ZM8.5 15.3075C9.60455 15.3075 10.5 14.3433 10.5 13.1538C10.5 11.9643 9.60455 11 8.5 11C7.39545 11 6.5 11.9643 6.5 13.1538C6.5 14.3433 7.39545 15.3075 8.5 15.3075ZM8.5 22.3075C9.60455 22.3075 10.5 21.3433 10.5 20.1537C10.5 18.9642 9.60455 18 8.5 18C7.39545 18 6.5 18.9642 6.5 20.1537C6.5 21.3433 7.39545 22.3075 8.5 22.3075Z" fill="#F2F2F3"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M19.5 6.15375C19.5 7.34325 18.6045 8.3075 17.5 8.3075C16.3954 8.3075 15.5 7.34325 15.5 6.15375C15.5 4.96427 16.3954 4 17.5 4C18.6045 4 19.5 4.96427 19.5 6.15375ZM17.5 15.3075C18.6045 15.3075 19.5 14.3433 19.5 13.1538C19.5 11.9643 18.6045 11 17.5 11C16.3954 11 15.5 11.9643 15.5 13.1538C15.5 14.3433 16.3954 15.3075 17.5 15.3075ZM17.5 22.3075C18.6045 22.3075 19.5 21.3433 19.5 20.1537C19.5 18.9642 18.6045 18 17.5 18C16.3954 18 15.5 18.9642 15.5 20.1537C15.5 21.3433 16.3954 22.3075 17.5 22.3075Z" fill="#F2F2F3"/>
                </svg>
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </div>
            )
          })}
        </div>
        <ConstructorElement
          key={`${bun._id}_bottombun`}
          type={'bottom'}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
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
  ingredients: PropTypes.array
};

export default BurgerConstructor;