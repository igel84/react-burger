import { 
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  CLOSE_ORDER
} from '../actions/order';

const initialState = {
  orderNum: null,
  orderRequest: false,
  orderFailed: false,
  isOrderOpen: false
};
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
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
      default: {
        return state;
      }
    }
  };