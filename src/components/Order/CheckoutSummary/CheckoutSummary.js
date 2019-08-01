import React from 'react';

import classes from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {


  return (
    <div className={classes.CheckoutSummary}>
      <h2>Hope you enjoy your own Burger</h2>
      <Burger
        ingredients={props.ingredients}
       />
       <div className={classes.OrderBox}>
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
       </div>
    </div>
  )
}

export default checkoutSummary;