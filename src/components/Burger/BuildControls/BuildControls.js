import React from 'react';

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
        added={() => props.ingredientAdded(item.type)}
        removed = {() => props.ingredientRemoved(item.type)}
        isDisabled = {props.disabledRemoved[item.type]} />
    })}
    <button
      className={classes.OrderButton}
      disabled={!props.readyToOrder}
      onClick={props.goCheckout}
    >CHECKOUT</button>
  </div>
);

export default buildControls;