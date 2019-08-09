import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
// import axios from '../../axios';

import classes from './Orders.css';

// import withNotifHandler from '../../hoc/WithNotifHandler/WithNotifHandler';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  showOrdersList = () => {
    if (this.props.error) {
      return (
        <div className={classes.ErrorBox}>
          <i className="fas fa-exclamation-triangle fa-4x"></i>
          <p>{this.props.errorMessage.message}</p>
        </div>
      )
    }

    const itemColorClass = (status) => {
      if (status === 'Order received') return classes.DangerItem;
      if (status === 'Shipping') return classes.PrimaryItem;
      if (status === 'Canceled') return classes.ErrorItem;
      return classes.SuccessItem;
    }

    if (this.props.ordersList.length > 0) {
      const list = this.props.ordersList.map(item => {
        return (
          <div className={classes.OrderItem} key={item.id}>
            <div className={[classes.OrderItemContent, itemColorClass(item.orderData.status)].join(' ')}>
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
        <p><span><Link to='/burger-builder' className={classes.SuccessText}>Build a burger</Link></span> to order now?</p>
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
    if (this.props.isAuthenticated) {
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
    return (
      <div className={classes.OrdersBox}>
        <div className={classes.NotAuthMessageBox}>
          <p>You have to <span><Link to='/signin' className={classes.SuccessText}>Sign in</Link></span> to see your orders...</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ordersList: state.order.ordersList,
    loading: state.order.loading,
    error: state.order.error,
    errorMessage: state.order.errorMessage,
    isAuthenticated: state.auth.token !== null,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initOrdersList: (userId) => dispatch(actions.fetchOrdersList(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);