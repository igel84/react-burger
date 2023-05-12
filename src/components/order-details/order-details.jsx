import React from 'react'
import PropTypes from 'prop-types'
import style from './order-details.module.css'
import doneImage from '../../images/done.png'
import { ConstructorContext } from '../../services/appContext'

export default function OrderDetails({orderNum, error}) {
  // eslint-disable-next-line 
  const { ingredients } = React.useContext(ConstructorContext);
  
  return (
    <>
      {orderNum !== null ? (<>
      <h3 className='text text_type_digits-large mt-5 mb-8'>{orderNum}</h3>
      <h4 className='text text_type_main-medium mt-4 mb-8'>идентификатор заказа</h4>
      <div className={style.icon}><img src={doneImage} alt='done icon' /></div>
      <h5 className='text text_type_main-small mt-4 mb-8'>Ваш заказ начали готовить</h5>
      <h6 className='text text_type_main-small mt-4 mb-8'>Дождитесь готовности на орбитальной станции</h6>
      </>
      ) : (<h3>{error}</h3>)}
      </>
  )
}

OrderDetails.propTypes = {
  orderNum: PropTypes.string,
  error: PropTypes.string,
};
