import React from 'react'
import style from './ingredient-details.module.css'
import Modal from '../modal/modal'
import PropTypes from 'prop-types';

export default function IngredientDetails(props) {  
  return (
    <Modal header='Детали ингредиента' onNothing={props.onNothing} onClose={props.onClose}> 
      <img src={props.img} alt={props.name} />
      <h4 className='text text_type_main-medium mt-4 mb-8'>{props.name}</h4>
      <div className={style.ingredients}>
        <div className='mr-5'>
          <span className="text text_type_main-default">Калории, ккал</span>
          <span className="text text_type_digits-default">{props.calories}</span>
        </div>
        <div className='mr-5'>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">{props.proteins}</span>
        </div>
        <div className='mr-5'>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">{props.fat}</span>
        </div>
        <div>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">{props.carbohydrates}</span>
        </div>
      </div>
    </Modal>
  )
}

IngredientDetails.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  onClose: PropTypes.func,
  onNothing: PropTypes.func
};