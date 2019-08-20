import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions/index';

// HOC
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

// Components
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';

export default (props) => {

  // ############################### Set up State and Store ###############################
  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);

  const dispatch = useDispatch();

  const fetchIngredients = () => dispatch(actions.fetchIngredients());
  
  useEffect(() => {
    fetchIngredients();
  }, [])


  // ############################### Component methods ###############################
  const checkReadyToOrder = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  const goCheckout = () => {
    props.history.push(props.match.url + '/checkout');
  }

  // ############################### Component content ###############################
  const disabledRemoved = {...ingredients};

    for (let key in disabledRemoved) {
      disabledRemoved[key] = disabledRemoved[key] <= 0;
    }

  let burgerBuilder = (
    <div style={{width:'100%', minHeight: '80vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Spinner isShow />
    </div>
  );

  if (ingredients) {
    burgerBuilder = (
      <Auxiliary>
        <Burger ingredients={ingredients} isScroll />

        <BuildControls 
          ingredients={ingredients}
          disabledRemoved = {disabledRemoved}
          totalPrice={totalPrice}
          readyToOrder={checkReadyToOrder(ingredients)}
          goCheckout={goCheckout} />
      </Auxiliary>
    );
  }
  
  return burgerBuilder;
}