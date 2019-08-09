import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

// HOC
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

// Components
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {

  state = {
    readyToPurchase: false,
    loading: false
  }

  componentDidMount() {
    this.props.fetchIngredients();
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

    return ( this.props.storeIngredients ?
      <Auxiliary>
        <Burger ingredients={this.props.storeIngredients} />

        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabledRemoved = {disabledRemoved}
          totalPrice={this.props.storeTotalPrice}
          readyToOrder={this.checkReadyToOrder(this.props.storeIngredients)}
          goCheckout={this.goCheckout} />

      </Auxiliary> :
      <div style={{width:'100%', minHeight: '80vh',display:'flex',justifyContent:'center',alignItems:'center'}}><Spinner isShow /></div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeIngredients: state.burgerBuilder.ingredients,
    storeTotalPrice: state.burgerBuilder.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchIngredients: () => dispatch(actions.fetchIngredients())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);