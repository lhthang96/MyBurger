import React from 'react';
import classes from './OrderSummary.css';

import Auxiliary from '../../../hoc/Auxiliary';

const orderSummary = (props) => {
  const orderedIngredientsList = Object.keys(props.ingredients)
    .map(igKey => {
      return <li key={igKey}><span>{igKey}: </span>{props.ingredients[igKey]}</li>
    })
  return (
    <Auxiliary>
      <h3>Your order</h3>
      <p>A delicious Burger with these following ingredients</p>
      <ul>
        {orderedIngredientsList}
      </ul>
      <p>Countinue to checkout </p>
    </Auxiliary>
  )
}

export default orderSummary;