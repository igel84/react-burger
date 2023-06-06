import { 
  OPEN_INGREDIENT,
  CLOSE_INGREDIENT
} from '../actions/ingredientDetailsModal';

const initialState = {
  currentIngredient: null,
  isIngredientOpen: false
};
  
export const ingredientDetailsModalReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: {
    return state;
    }
  }
};