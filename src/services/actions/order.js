import { getIngredientsRequest, postOrderRequest } from '../../utils/burger-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const OPEN_INGREDIENT = 'OPEN_INGREDIENT';
export const CLOSE_INGREDIENT = 'CLOSE_INGREDIENT';
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';
export const ADD_TO_ORDER = 'ADD_TO_ORDER';
export const REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER';
export const SET_CURRENT_DRAGGING = 'SET_CURRENT_DRAGGING';
export const SET_DRAGGING_POSITION = 'SET_DRAGGING_POSITION';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    })
    getIngredientsRequest().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    })
  }
}

export function postOrder(items) {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    })
    postOrderRequest(items).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderNum: res.order.number
        });
      } else {
        dispatch({
          type: POST_ORDER_FAILED
        });
      }
    })
    .catch( err => {
      dispatch({
        type: POST_ORDER_FAILED,
        orderErrors: err
      });
    })
  };
}