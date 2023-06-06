import {v4} from "uuid";

import { 
  SET_CURRENT_DRAGGING,
  SET_DRAGGING_POSITION,
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR
} from '../actions/burgerConstructor';

const initialState = {
  constructorIngredients: [],
  currentDragging: null
};
  
export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {      
    case SET_CURRENT_DRAGGING: {
      return {
        ...state,
        currentDragging: state.constructorIngredients.find(item => item.genId === action.item)
      }
    }
    case SET_DRAGGING_POSITION: {
      const buns = state.constructorIngredients.filter(item => item.type === 'bun')
      const itemBack = state.constructorIngredients.find(item => item.genId === action.backId)
      const itemFront = state.constructorIngredients.find(item => item.genId === action.frontId)
      const itemsBefore = [...state.constructorIngredients.filter(item => item.genId !== action.frontId && item.position < itemBack.position)]
      const itemsAfter = [...state.constructorIngredients.filter(item => item.genId !== action.frontId && item.position >= itemBack.position)]

      return {
        ...state,
        constructorIngredients: itemsBefore.concat(itemFront).concat(itemsAfter).concat(buns)
      }
    }
    case ADD_TO_CONSTRUCTOR: {
      // const ingredient = [...state.ingredients].find(item => item._id === action.item._id)
      return {
        ...state,
        constructorIngredients: 
          action.ingredient.type === 'bun' 
            ? [
                ...state.constructorIngredients.filter(item => item.type !== 'bun'), 
                {...action.ingredient, genId: v4()}
              ]
            : [
                ...state.constructorIngredients, 
                {...action.ingredient, genId: v4(), position: state.constructorIngredients.length}
              ]
      }
    }
    case REMOVE_FROM_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(item => item.genId !== action.item)
      }
    }
    default: {
      return state;
    }
  }
};