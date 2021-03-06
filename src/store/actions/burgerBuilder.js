import * as actionTypes from './actionTypes';
import axios from '../../axios';

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

// Combo ingredients for specific burger
export const burgerComboStandard = () => {
  return {
    type: actionTypes.BURGER_COMBO_STANDARD
  }
}

export const resetIngredient = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS
  }
}

export const initIngredients = (ingredients) => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        dispatch(initIngredients(res.data[Object.keys(res.data)[0]].ingredients)); // Get first props in the res.data object
      })
      .catch(err => {
        console.log(err);
      })
  }
}