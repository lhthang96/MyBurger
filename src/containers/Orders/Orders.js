import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Orders.css';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    if (this.unmount) return;
    this.props.initOrdersList();
  }

  componentWillUnmount () {
    this.unmount = true;
  }

  showOrdersList = () => {
    if (this.props.ordersList.length > 0) {
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
    } return (
      <div className={classes.noOrderMessageBox}>
        <p className={classes.noOrdersMessage}>You don't have any orders.</p>
        <p><span><Link to='/burger-builder' className={classes.noOrderLink}>Build a burger</Link></span> to order now?</p>
      </div>
    ) ;
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

  render() {
    return (
      <div className={classes.OrdersBox}>
        <h3 className={this.props.ordersList.length > 0 ? null : classes.displayNone}>Your orders:</h3>
        <div className={classes.SpinnerBox}>
          <Spinner isShow={this.props.loading} />
        </div>
        {this.props.loading ? null : this.showOrdersList()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ordersList: state.order.ordersList,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initOrdersList: () => dispatch(actions.fetchOrdersList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);