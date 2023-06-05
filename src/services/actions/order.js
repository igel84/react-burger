import { postOrderRequest } from '../../utils/burger-api';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

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