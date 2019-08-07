import * as actionTypes from '../actions/actionTypes';

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

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
      }

    case actionTypes.REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientType]: state.ingredients[action.ingredientType] - 1
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType]
        }

    case actionTypes.RESET_INGREDIENTS:
      const resetIngredients = {
        ...state.ingredients
      };
      for (let key in resetIngredients) {
        resetIngredients[key] = 0
      }
      return {
        ...state,
        ingredients: resetIngredients,
        totalPrice: 4
      }

    case actionTypes.INIT_INGREDIENTS:
      if (state.ingredients === null){
        return {
          ...state,
          ingredients: action.ingredients
        }
      };
      return {
        ...state
      }

    default: return state;
  }
}