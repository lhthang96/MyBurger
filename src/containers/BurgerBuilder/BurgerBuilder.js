import React, {Component} from 'react';
import {connect} from 'react-redux';

// HOC
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

// Components
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {

  state = {
    readyToPurchase: false,
    loading: false
  }

  checkReadyToOrder (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  goCheckout = () => {
    this.props.history.push(this.props.match.url + '/checkout');
  }

  resetIngredient = () => {
    const updatedState = {
      ...this.props.storeIngredients
    }
    for (let key in updatedState) {
      updatedState[key] = 0;
    };
    this.setState({
      ingredients: updatedState,
      totalPrice: 4,
      readyToOrder: false
    });
  }

  render() {
    const disabledRemoved = {...this.props.storeIngredients};

    for (let key in disabledRemoved) {
      disabledRemoved[key] = disabledRemoved[key] <= 0;
    }

    return (
      <Auxiliary>
        <Burger ingredients={this.props.storeIngredients} />

        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabledRemoved = {disabledRemoved}
          totalPrice={this.props.storeTotalPrice}
          readyToOrder={this.checkReadyToOrder(this.props.storeIngredients)}
          goCheckout={this.goCheckout} />

      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeIngredients: state.ingredients,
    storeTotalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps,null)(BurgerBuilder);