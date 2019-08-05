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
    const queryParams = [];
    for (let i in this.props.storeIngredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.storeIngredients[i]));
    }
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: this.props.match.url + '/checkout',
      search: '?' + queryString
    })
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.props.storeIngredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.props.storeIngredients
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceChanged = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceChanged;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.checkReadyToOrder(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.props.storeIngredients[type];

  //   // Check whether ingredient have
  //   if (oldCount <= 0) return;

  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.props.storeIngredients
  //   }
  //   updatedIngredients[type] = updatedCount;
  //   const priceChanged = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceChanged;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.checkReadyToOrder(updatedIngredients);
  // }

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