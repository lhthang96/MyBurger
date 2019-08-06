import * as actionTypes from './actionTypes';

export const addIngredient = (ingredientType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientType: ingredientType
  }
}

export const removeIngredient = (ingredientType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientType: ingredientType
  }
}

export const resetIngredient = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS
  }
}