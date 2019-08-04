import React, {Component} from 'react';

// HOC
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

// Components
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    readyToOrder: false,
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

    this.setState({readyToOrder: sum > 0});
  }

  goCheckout = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: this.props.match.url + '/checkout',
      search: '?' + queryString
    })
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

  resetIngredient = () => {
    const updatedState = {
      ...this.state.ingredients
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
    const disabledRemoved = {...this.state.ingredients};

    for (let key in disabledRemoved) {
      disabledRemoved[key] = disabledRemoved[key] <= 0;
    }

    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />

        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabledRemoved = {disabledRemoved}
          totalPrice={this.state.totalPrice}
          readyToOrder={this.state.readyToOrder}
          goCheckout={this.goCheckout} />

      </Auxiliary>
    );
  }
}

export default BurgerBuilder;