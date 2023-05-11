import React from 'react'
import PropTypes from 'prop-types'
import burgerConstructor from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'
import Modal from '../modal/modal'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor(props) {
  const bun = props.ingredients.find((ingredient) => ingredient.type === 'bun');
  const [modal, setModal] = React.useState({
    name: null,
    img: null,
    calories: null,
    isVisible: false
  })

  const handleOpenModal = (e) => {
    setModal({
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
                <DragIcon type="primary" />
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
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {modal.isVisible &&
        <Modal header='' onNothing={handleNothingModal} onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array
};

export default BurgerConstructor;