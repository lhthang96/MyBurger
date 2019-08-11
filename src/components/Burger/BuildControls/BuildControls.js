import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Bacon', type: 'bacon'},
  {label: 'Chesse', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
  {label: 'Salad', type: 'salad'}
];

const buildControls = (props) => {
  console.log(props.ingredients);
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.totalPrice.toFixed(2)} $</strong></p>
      <div className={classes.ResetIngredientsBox}>
        <p onClick={props.resetIngredient} style={{color:'#703B09'}} >Reset</p>
        <p onClick={props.burgerComboStandard} style={{color:'#2f4e03'}} >Standard burger</p>
      </div>
      {controls.map(item => {
        return <BuildControl
          key={item.label}
          label={item.label + ' (' + props.ingredients[item.type] + ') '}
          added={() => props.addIngredient(item.type)}
          removed = {() => props.removeIngredient(item.type)}
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

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
    removeIngredient: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
    resetIngredient: () => dispatch(actions.resetIngredient()),
    burgerComboStandard: () => dispatch(actions.burgerComboStandard())
  }
}

export default connect(null,mapDispatchToProps)(buildControls);