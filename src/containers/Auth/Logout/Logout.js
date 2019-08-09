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
      <Redirect to='/' />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    resetOrdersList: () => dispatch(actions.resetOrdersList())
  }
}

export default connect(null, mapDispatchToProps)(Logout);