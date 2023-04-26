import React from 'react';
import PropTypes from 'prop-types';
import burgerIngredients from './burger-ingredients.module.css'
import Card from '../card/card'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one')
  return (
    <section className="mr-10">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <h2 className="text text_type_main-medium mt-10">Булки</h2>
      <div className={burgerIngredients.list}>
        {props.ingredients.map((ingredient) => {
          return(
            <Card key={ingredient._id} {...ingredient} />
          )
        })}
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
};

export default BurgerIngredients;