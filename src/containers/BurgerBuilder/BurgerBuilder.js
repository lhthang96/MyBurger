import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

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
    }
  }

  render() {
    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Auxiliary>
    );
  }
}