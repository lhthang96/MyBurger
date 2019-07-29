import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export default class extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {

  //   }
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    readyToOrder: false,
    readyToPurchase: false
  }

  checkReadyToOrder (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
      this.setState({readyToOrder: sum > 0});
  }

  setReadyToPurchase = () => {
    this.setState({readyToPurchase: true});
  }

  cancelReadyToPurchase = () => {
    this.setState({readyToPurchase: false});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceChanged = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceChanged;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.checkReadyToOrder(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    // Check whether ingredient have
    if (oldCount <= 0) return;

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceChanged = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceChanged;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.checkReadyToOrder(updatedIngredients);
  }

  render() {
    const disabledRemoved = {...this.state.ingredients};

    for (let key in disabledRemoved) {
      disabledRemoved[key] = disabledRemoved[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal isShow={this.state.readyToPurchase} closeModal={this.cancelReadyToPurchase}><OrderSummary ingredients = {this.state.ingredients} /></Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabledRemoved = {disabledRemoved}
          totalPrice={this.state.totalPrice}
          readyToOrder={this.state.readyToOrder}
          readyToPurchase={this.setReadyToPurchase} />
      </Auxiliary>
    );
  }
}