import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
// import axios from '../../axios';

import classes from './Orders.css';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

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
    if (this.unmount) return;
    this.props.initOrdersList();
    // axios.get('/orders.json')
    //   .then(res => {
    //     if (this.unmount) return;
    //     const fetchedData = [];
    //     for (let key in res.data) {
    //       fetchedData.push({
    //         ...res.data[key],
    //         status: 'Order received',
    //         id: key
    //       })
    //     }
    //     this.setState({loading:false, orders: fetchedData});
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({loading: false});
    //   })
  }

  componentWillUnmount () {
    this.unmount = true;
  }

  showOrdersList = () => {
    if (this.props.ordersList) {
      console.log(this.props.ordersList);
      const list = this.props.ordersList.map(item => {
        return (
          <div className={classes.OrderItem} key={item.id}>
            <div className={classes.OrderItemContent}>
              <p><strong>Ingredients: </strong>{this.ingredientsList(item.orderData.ingredients)}</p>
              <p><strong>Total Price: </strong>{item.orderData.totalPrice.toFixed(2)} $</p>
              <p><strong>Status: </strong>{item.orderData.status}</p>
            </div>
          </div>
        )
      });
      return list;
    } return <p>You don't have any orders. Lets get one...</p> ;
  }

  ingredientsList = (list) => {
    let ingredients = [];
    for (let key in list) {
      ingredients.push({
        name: key,
        amount: list[key]
      }) 
    };
    
    const ingredientsList = ingredients.map(item => {
      if (item.amount > 0) {
        return <span key={item.name}>{item.name} ({item.amount})</span>
      } else return null;
    });
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
        {/* <div className={classes.SpinnerBox}>
          <Spinner isShow />
        </div> */}
        {this.showOrdersList()}
        {this.showDemoOrders()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ordersList: state.order.ordersList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initOrdersList: () => dispatch(actions.fetchOrdersList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);