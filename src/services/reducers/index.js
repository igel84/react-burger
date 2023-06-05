import { combineReducers } from 'redux';
import { orderReducer } from './order';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientDetailsModalReducer } from './ingredientDetailsModal';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetailsModal: ingredientDetailsModalReducer,
  order: orderReducer
});