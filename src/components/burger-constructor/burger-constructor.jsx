import React from 'react'
import PropTypes from 'prop-types'
import burgerConstructor from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'
import { api } from '../../services/appConst'
import Modal from '../modal/modal'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorContext } from '../../services/appContext'

function BurgerConstructor() {
  const { ingredients } = React.useContext(ConstructorContext);
  
  const bun = React.useMemo(() => {
    return ingredients.find((ingr) => ingr.type === 'bun');
  }, [ingredients]);
  const stuff = React.useMemo(() => {
    return ingredients.filter((ingr) => ingr.type !== 'bun');
  }, [ingredients]);

  const [summ, setSumm] = React.useState();
  const [nums, setNums] = React.useState();

  React.useEffect(() => {
    setSumm(stuff.reduce((s, val) => s + val.price, bun.price * 2));
    let ids = [bun._id]
    stuff.map((val) => ids.push(val._id))
    setNums(ids);
  // eslint-disable-next-line
  }, [ingredients])

  const [modal, setModal] = React.useState({orderNum: null, isVisible: false})

  const handleOpenModal = (e) => {
    fetch(`${api}api/orders`, {
      method: "POST", 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"ingredients": nums})
    })
    .then(function(res) {
      if (res.status !== 200) {
        setModal({...modal, error: `ERROR: ${res.status}`, isVisible: true})
        return
      }
      res.json().then(function(data) {
        setModal({...modal, orderNum: data.order.number, isVisible: true})
      })
    })
    .catch(function(err) {
      setModal({...modal, error: `ERROR: ${err.message}`, isVisible: true})
    });
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
          {stuff.map((ingredient) => {
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
        <span className="text text_type_digits-medium">{summ}</span>
        <CurrencyIcon />
        <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {modal.isVisible &&
        <Modal header='' onNothing={handleNothingModal} onClose={handleCloseModal}>
          <OrderDetails orderNum={modal.orderNum} error={modal.error} />
        </Modal>
      }
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array
};

export default BurgerConstructor;