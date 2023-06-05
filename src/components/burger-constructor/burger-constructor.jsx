import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import burgerConstructor from './burger-constructor.module.css'
import OrderDetails from '../order-details/order-details'
import Staff from '../staff/staff'
import Modal from '../modal/modal'
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postOrder, CLOSE_ORDER } from '../../services/actions/order'
import { ADD_TO_CONSTRUCTOR } from '../../services/actions/burgerConstructor'

function BurgerConstructor({onDropHandler}) {
  const dispatch = useDispatch();
  const { ingredients, constructorIngredients, isOrderOpen, orderNum, orderFailed } = useSelector(store => ({
    ingredients: store.ingredients.ingredients,
    constructorIngredients: store.burgerConstructor.constructorIngredients,
    isOrderOpen: store.order.isOrderOpen,
    orderNum: store.order.orderNum,
    orderFailed: store.order.orderFailed,
  }));

  const { bun, stuff } = useMemo(() => {
    return {
      bun: constructorIngredients.find((ingr) => ingr.type === 'bun'),
      stuff: constructorIngredients.filter((ingr) => ingr.type !== 'bun')
    }
  }, [constructorIngredients]);

  const [burgerPrice, setBurgerPrice] = useState(0);
  const [burgerIngredientsId, setBurgerIngredientsId] = useState([]);

  const [, dropRef] = useDrop({
    accept: "ingredients",
    drop(itemId) {
      handleDrop(itemId);
    },
  });

  useEffect(() => {
    let ids = [];
    if (bun) { 
      setBurgerPrice(stuff.reduce((s, val) => s + val.price, bun.price * 2));
      ids.push(bun._id);
    }
    stuff.map((val) => ids.push(val._id))
    setBurgerIngredientsId(ids);
  // eslint-disable-next-line
  }, [constructorIngredients])

  const handleOpenModal = (e) => {
    dispatch(postOrder(burgerIngredientsId));
  }

  const handleCloseModal = () => {
    dispatch({type: CLOSE_ORDER});
  }

  const handleNothingModal = (e) => {
    e.stopPropagation();
  }

  const handleDrop = (itemId) => {
    const ingredient = [...ingredients].find(item => item._id === itemId._id)
    dispatch({
      type: ADD_TO_CONSTRUCTOR,
      item: itemId,
      ingredient: ingredient
    });
  };

  return (
    <section className='mt-25' ref={dropRef}>
      <div className={burgerConstructor.list}>        
        {bun && <ConstructorElement
          type={'top'}
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />}
        <div className={burgerConstructor.inputs}>
          {stuff.map((ingredient) => <Staff key={ingredient.genId} ingredient={ingredient} />)}
        </div>
        {bun && <ConstructorElement
          type={'bottom'}
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />}
      </div>
      <div className={burgerConstructor.total}>
        <span className="text text_type_digits-medium">{burgerPrice}</span>
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