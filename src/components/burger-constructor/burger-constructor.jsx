import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import burgerConstructor from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'
import Staff from '../staff/staff'
import Modal from '../modal/modal'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postOrder, CLOSE_ORDER, ADD_TO_ORDER } from '../../services/actions/order'

function BurgerConstructor({onDropHandler}) {
  const dispatch = useDispatch();
  const { constructorIngredients, isOrderOpen, orderNum, orderFailed } = useSelector(store => ({
    constructorIngredients: store.order.constructorIngredients,
    isOrderOpen: store.order.isOrderOpen,
    orderNum: store.order.orderNum,
    orderFailed: store.order.orderFailed,
  }));

  const bun = React.useMemo(() => {
    return constructorIngredients.find((ingr) => ingr.type === 'bun');
  }, [constructorIngredients]);
  const stuff = React.useMemo(() => {
    return constructorIngredients.filter((ingr) => ingr.type !== 'bun');
  }, [constructorIngredients]);

  const [summ, setSumm] = React.useState(0);
  const [nums, setNums] = React.useState([]);

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(itemId) {
      handleDrop(itemId);
    },
  });

  React.useEffect(() => {
    let ids = [];
    if (bun) { 
      setSumm(stuff.reduce((s, val) => s + val.price, bun.price * 2));
      ids.push(bun._id);
    }
    stuff.map((val) => ids.push(val._id))
    setNums(ids);
  // eslint-disable-next-line
  }, [constructorIngredients])

  const handleOpenModal = (e) => {
    dispatch(postOrder(nums));
  }

  const handleCloseModal = () => {
    dispatch({type: CLOSE_ORDER});
  }

  const handleNothingModal = (e) => {
    e.stopPropagation();
  }

  const handleDrop = (itemId) => {
    dispatch({
      type: ADD_TO_ORDER,
      item: itemId
    });
  };

  return (
    <section className='mt-25' ref={dropRef}>
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
          {stuff.map((ingredient) => <Staff key={ingredient.genId} {...ingredient} />)}
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
      {isOrderOpen &&
        <Modal header='' onNothing={handleNothingModal} onClose={handleCloseModal}>
          <OrderDetails orderNum={orderNum} error={orderFailed && 'ошибка оформления заказа'} />
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor;