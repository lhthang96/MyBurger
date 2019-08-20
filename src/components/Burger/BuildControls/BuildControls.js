import React from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Bacon', type: 'bacon'},
  {label: 'Chesse', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
  {label: 'Salad', type: 'salad'}
];

export default (props) => {
  // ############################### Set up State and Store ###############################
  const dispatch = useDispatch();

  const addIngredient = (ingredientType) => dispatch(actions.addIngredient(ingredientType));
  const removeIngredient = (ingredientType) => dispatch(actions.removeIngredient(ingredientType));
  const resetIngredient = () => dispatch(actions.resetIngredient());
  const burgerComboStandard = () => dispatch(actions.burgerComboStandard());

  // ############################### Component Content ###############################
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.totalPrice.toFixed(2)} $</strong></p>
      <div className={classes.ResetIngredientsBox}>
        <p onClick={resetIngredient} style={{color:'#703B09'}} >Reset</p>
        <p onClick={burgerComboStandard} style={{color:'#2f4e03'}} >Standard burger</p>
      </div>
      {controls.map(item => {
        return <BuildControl
          key={item.label}
          label={item.label + ' (' + props.ingredients[item.type] + ') '}
          added={() => addIngredient(item.type)}
          removed = {() => removeIngredient(item.type)}
          isDisabled = {props.disabledRemoved[item.type]} />
      })}
  
      <button
        className={classes.OrderButton}
        disabled={!props.readyToOrder}
        onClick={props.goCheckout}
      >CHECKOUT</button>
    </div>
  );
}