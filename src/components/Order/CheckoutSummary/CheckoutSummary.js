import React from 'react';

import classes from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';

const checkoutSummary = (props) => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key]
    })
  }

  const IngredientItems = ingredients.map(item => {
    if (item.amount > 0) {
      return <span className={classes.BurgerInfoItem} key={item.name}> {item.name} ({item.amount})</span>
    } else return null;
  })

  return (
    <div className={classes.CheckoutSummary}>
      <h2>Your Burger</h2>
      <Burger
        ingredients={props.ingredients}
      />
      <div className={classes.BurgerInfoBox}>
        <h4>Your ingredients:</h4>
        
        <div className={classes.IngredientInfoBox}>
          {IngredientItems}
        </div>

        <p>Total Price: <span>{props.totalPrice.toFixed(2)} $</span></p>
      </div>
    </div>
  )
}

export default checkoutSummary;