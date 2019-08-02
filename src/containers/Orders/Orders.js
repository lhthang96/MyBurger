import React, {Component} from 'react';
import axios from '../../axios';

import classes from './Orders.css';

export default class extends Component {

  state = {
    demoOrders: [
      {
        ingredients: {
          salad: 1,
          meat: 2,
          cheese: 1,
          bacon: 1
        },
        totalPrice: 7.80,
        status: 'Order received',
        id: '1'
      },
      {
        ingredients: {
          salad: 1,
          meat: 2,
          cheese: 1,
          bacon: 1
        },
        totalPrice: 7.80,
        status: 'Shipping',
        id: '2'
      },
      {
        ingredients: {
          salad: 1,
          meat: 2,
          cheese: 1,
          bacon: 1
        },
        totalPrice: 7.80,
        status: 'Done',
        id: '3'
      }
    ],
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(res => {
        console.log(res.data);
        this.setState({loading:false})
      })
      .catch(error => {
        console.log(error);
        this.setState({loading: false});
      })
  }

  ingredientsList = (list) => {
    let ingredients = [];
    for (let key in list) {
      ingredients.push({
        name: key,
        amount: list[key]
      }) 
    };
    
    const ingredientsList = ingredients.map(item => (
      <span key={item.name}>{item.name} ({item.amount})</span>
    ))
    return(ingredientsList);
  }

  showDemoOrders = () => {
    const demoList = this.state.demoOrders.map(item => {
      return (
        <div className={classes.OrderItem} key={item.id}>
          <div className={classes.OrderItemContent}>
            <p><strong>Ingredients: </strong>{this.ingredientsList(item.ingredients)}</p>
            <p><strong>Total Price: </strong>{item.totalPrice.toFixed(2)} $</p>
            <p><strong>Status: </strong>{item.status}</p>
          </div>
        </div>
      )
    });
    return (demoList);
  }

  render() {
    return (
      <div className={classes.OrdersBox}>
        <h3>Your orders:</h3>
        {this.showDemoOrders()}
      </div>
    )
  }
}