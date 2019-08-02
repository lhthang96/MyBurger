import React from 'react';

import classes from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
// import Button from '../../UI/Button/Button';

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
          {/* <span className={classes.BurgerInfoItem}>
            Salad (2)
          </span>

          <span className={classes.BurgerInfoItem}>
            Meat (2)
          </span>

          <span className={classes.BurgerInfoItem}>
            Cheese (2)
          </span>

          <span className={classes.BurgerInfoItem}>
            Bacon (2)
          </span> */}
          {IngredientItems}
        </div>

        <p>Total Price: <span>7.80 $</span></p>
      </div>
       {/* <div className={classes.OrderBox}>
         <div className={classes.BtnBox}>
           <Button
              btnType='Danger'
              clicked={props.cancelOrderHandler}
           >Cancel
           </Button>
           <Button
              btnType='Success'
              clicked={props.sendOrderHandler}
            >Send Order
           </Button>
         </div>
       </div> */}
    </div>
  )
}

export default checkoutSummary;