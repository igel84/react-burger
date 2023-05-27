import React from 'react'
import burgerConstructor from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'
import { getOrder } from '../../utils/burger-api'
import Modal from '../modal/modal'
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ConstructorContext } from '../../services/appContext'

function BurgerConstructor() {
  const { state } = React.useContext(ConstructorContext);
  const ingredients = state.ingredients;
  
  const bun = React.useMemo(() => {
    return ingredients.find((ingr) => ingr.type === 'bun');
  }, [ingredients]);
  const stuff = React.useMemo(() => {
    return ingredients.filter((ingr) => ingr.type !== 'bun');
  }, [ingredients]);

  const [summ, setSumm] = React.useState(0);
  const [nums, setNums] = React.useState([]);

  React.useEffect(() => {
    setSumm(stuff.reduce((s, val) => s + val.price, bun.price * 2));
    let ids = [bun._id]
    stuff.map((val) => ids.push(val._id))
    setNums(ids);
  // eslint-disable-next-line
  }, [ingredients])

  const [modal, setModal] = React.useState({orderNum: null, isVisible: false})

  const handleOpenModal = (e) => {
    getOrder(nums)
      .then(function(res){
        console.log(res.data);
        setModal({...modal, orderNum: res.order.number, isVisible: true})
      })
      .catch(function (err) {
        console.log(err);
        setModal({...modal, error: 'Ошибка оформления заказа', isVisible: true})
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
        {bun && <ConstructorElement
          key={`${bun._id}_topbun`}
          type={'top'}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />}
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
        {bun && <ConstructorElement
          key={`${bun._id}_bottombun`}
          type={'bottom'}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />}
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

export default BurgerConstructor;