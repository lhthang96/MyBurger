import React, {Component} from 'react';

import classes from './OrderForm.css';

import Button from '../../components/UI/Button/Button';

export default class extends Component {
  state = {
    name: '',
    deliveryAddress: '',
    phone: ''
  }

  render() {
    return(
      <div className={classes.OrderFormBox}>
        <h2>Contact Info</h2>
        <form>
          <div className={classes.OrderFormItem}>
            <label>Name</label>
            <input type="text" />
          </div>

          <div className={classes.OrderFormItem}>
            <label>Phone</label>
            <input type="text" />
          </div>

          <div className={classes.OrderFormItem}>
            <label>Address</label>
            <input type="text" />
          </div>
        </form>

        <div className={classes.BtnBox}>
           <Button
              btnType='Danger'
              clicked={this.props.cancelOrderHandler}
           >Cancel
           </Button>
           <Button
              btnType='Success'
              clicked={this.props.sendOrderHandler}
            >Order
           </Button>
         </div>
      </div>
    )
  }
}