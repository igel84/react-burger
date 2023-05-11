import React from 'react'
import PropTypes from 'prop-types'
import burgerIngredients from './burger-ingredients.module.css'
import Card from '../card/card'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one')
  const [modal, setModal] = React.useState({
    ingredient: null,
    isVisible: false
  })

  const handleOpenModal = (e, ingredient) => {
    setModal({
      ingredient: ingredient,
      isVisible: true
    })
  }

  const handleCloseModal = () => {
    setModal({...modal, isVisible: false})
  }

  const handleNothingModal = (e) => {
    e.stopPropagation();
  }

  return (
    <section className="mr-10">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={burgerIngredients.tabs}>
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
      <div className={burgerIngredients.all}>
        <h2 className="text text_type_main-medium mt-10">Булки</h2>
        <div className={burgerIngredients.list}>
          {props.ingredients.map((ingredient) => {
            return(
              <Card
                key={ingredient._id}
                ingredient={ingredient}
                onCardClick={(e) => handleOpenModal(e, ingredient)}
              />
            )
          })}
        </div>
      </div>
      {modal.isVisible && 
        <Modal header='Детали ингредиента' onNothing={handleNothingModal} onClose={handleCloseModal}>
          <IngredientDetails ingredient={modal.ingredient} />
        </Modal>
      }
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.array
};

export default BurgerIngredients;