import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {

  componentDidMount() {
    this.props.logout();
    this.props.resetOrdersList();
  }

  render() {
    return (
      this.props.building ? <Redirect to='/burger-builder/checkout' /> : <Redirect to='/' />
    )
  }
}

const mapStateToProps = state => {
  return {
    building: state.burgerBuilder.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    resetOrdersList: () => dispatch(actions.resetOrdersList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);