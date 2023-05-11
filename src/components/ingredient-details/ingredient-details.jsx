import React from 'react'
import style from './ingredient-details.module.css'
import PropTypes from 'prop-types';

export default function IngredientDetails(props) {
  const {name, image_large, calories, proteins, fat, carbohydrates} = props.ingredient
  return ( 
    <>
      <img src={image_large} alt={name} />
      <h4 className='text text_type_main-medium mt-4 mb-8'>{name}</h4>
      <div className={style.ingredients}>
        <div className='mr-5'>
          <span className="text text_type_main-default">Калории, ккал</span>
          <span className="text text_type_digits-default">{calories}</span>
        </div>
        <div className='mr-5'>
          <span className="text text_type_main-default">Белки, г</span>
          <span className="text text_type_digits-default">{proteins}</span>
        </div>
        <div className='mr-5'>
          <span className="text text_type_main-default">Жиры, г</span>
          <span className="text text_type_digits-default">{fat}</span>
        </div>
        <div>
          <span className="text text_type_main-default">Углеводы, г</span>
          <span className="text text_type_digits-default">{carbohydrates}</span>
        </div>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.object
};