import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initState = {
  ingredients: null,
  totalPrice: 4
}

const addIngredient = (state, action) => {
  const updatedState = {
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: state.ingredients[action.ingredientType] + 1
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
  };
  return updatedObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedState = {
    ingredients: {
      ...state.ingredients,
      [action.ingredientType]: state.ingredients[action.ingredientType] - 1
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
  };
  return updatedObject(state, updatedState);
}

const resetIngredients = (state, action) => {
  const updatedIngredients = {
    ...state.ingredients
  };
  for (let key in updatedIngredients) {
    updatedIngredients[key] = 0
  }
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: 4
  }
  return updatedObject(state, updatedState);
}

const initIngredients = (state, action) => {
  if (state.ingredients === null){
    return updatedObject(state, {ingredients: action.ingredients});
  };
  return state;
}

export default (state = initState, action) => {
  switch (action.type) {
    
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.RESET_INGREDIENTS:
      return resetIngredients(state, action);

    case actionTypes.INIT_INGREDIENTS:
      return initIngredients(state, action);

    default: return state;
  }
}