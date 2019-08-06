import React from 'react';
import classes from './OrderSummary.css';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const orderedIngredientsList = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}: </span>{props.ingredients[igKey]}</li>
    })
  return (
    <Auxiliary>
      <h3>Your order</h3>
      <p>A delicious Burger with these following ingredients:</p>
      <ul>
        {orderedIngredientsList}
      </ul>
      <p>Total Price: <strong>{props.totalPrice.toFixed(2)} $</strong></p>
      <div className={classes.CheckoutSection}>
        <p>Continue to checkout ?</p>
        <div className={classes.BtnBox}>
          <Button clicked={props.closeModal} btnType="Danger">Cancel</Button>
          <Button clicked={props.sendOrder} btnType="Success">Continue</Button>
        </div>
      </div>
    </Auxiliary>
  )
}

export default orderSummary;