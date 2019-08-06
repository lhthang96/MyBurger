import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Chesse', type: 'cheese'},
  {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.totalPrice.toFixed(2)} $</strong></p>
    {controls.map(item => {
      return <BuildControl
        key={item.label}
        label={item.label}
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

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
    removeIngredient: (ingredientType) => dispatch(actions.removeIngredient(ingredientType))
  }
}

export default connect(null,mapDispatchToProps)(buildControls);