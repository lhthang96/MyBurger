import React, {Component} from 'react';

import classes from './OrderForm.css';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your name',
          type: 'text'
        },
        value: '',
        label: 'Name'
      },
      address: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Delivery address',
          type: 'text'
        },
        value: '',
        label: 'Address'
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Your phone',
          type: 'text'
        },
        value: '',
        label: 'Phone'
      },
      deliMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'standard', displayText: 'Standard'},
            {value: 'fastest', displayText: 'Fastest'},
            {value: 'cheapest', displayText: 'Cheapest'}
          ]
        },
        value: 'standard',
        label: 'Delivery method'
      },
    }
  }

  inputChangedHandler = (event, inputIdentify) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentify]
    }
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentify] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm});
  }

  render() {
    let formItems = [];
    for (let key in this.state.orderForm) {
      formItems.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    return(
      <div className={classes.OrderFormBox}>
        <h2>Contact Info</h2>
        <form>
          {formItems.map(item => (
            <div className={classes.OrderFormItem} key={item.id}>
              <Input
                elementType={item.config.elementType}
                elementConfig={item.config.elementConfig}
                label={item.config.label}
                value={item.config.value}
                changed={(event) => this.inputChangedHandler(event, item.id)} />
            </div>
          ))}
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