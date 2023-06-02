import {v4} from "uuid";

import { 
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    CLOSE_ORDER,
    ADD_TO_ORDER,
    REMOVE_FROM_ORDER,
    SET_CURRENT_DRAGGING,
    SET_DRAGGING_POSITION
} from '../actions/order';

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    constructorIngredients: [],
    currentIngredient: null,
    isIngredientOpen: false,
    orderNum: null,
    orderRequest: false,
    orderFailed: false,
    isOrderOpen: false,
    currentDragging: null
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
        return {
          ...state,
          ingredientsRequest: true
        };
      }
      case GET_INGREDIENTS_SUCCESS: {
        return { 
          ...state,
          ingredientsFailed: false,
          ingredients: action.ingredients,
          ingredientsRequest: false
        };
      }
      case GET_INGREDIENTS_FAILED: {
        return { 
          ...state, 
          ingredientsFailed: true, 
          ingredientsRequest: false 
        };
      }
      case OPEN_INGREDIENT: {
        return {
          ...state,
          currentIngredient: action.ingredient,
          isIngredientOpen: true
        }
      }
      case CLOSE_INGREDIENT: {
        return {
          ...state,
          currentIngredient: null,
          isIngredientOpen: false
        }
      }
      case POST_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true
        }
      }
      case POST_ORDER_SUCCESS: {
        return {
          ...state,
          orderRequest: false,
          orderNum: action.orderNum,
          orderFailed: false,
          isOrderOpen: true
        }
      }
      case POST_ORDER_FAILED: {
        return {
          ...state,
          orderRequest: false,
          orderFailed: true,
          orderNum: null,
          isOrderOpen: true
        }
      }
      case CLOSE_ORDER: {
        return {
          ...state,
          isOrderOpen: false
        }
      }
      case ADD_TO_ORDER: {
        const ingredient = [...state.ingredients].find(item => item._id === action.item._id)
        return {
          ...state,
          constructorIngredients: 
            ingredient.type === 'bun' 
              ? [
                  ...state.constructorIngredients.filter(item => item.type !== 'bun'), 
                  {...ingredient, genId: v4()}
                ]
              : [
                  ...state.constructorIngredients, 
                  {...ingredient, genId: v4(), position: state.constructorIngredients.length}
                ]
        }
      }
      case REMOVE_FROM_ORDER: {
        return {
          ...state,
          constructorIngredients: state.constructorIngredients.filter(item => item.genId !== action.item)
        }
      }
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
      default: {
        return state;
      }
    }
  };