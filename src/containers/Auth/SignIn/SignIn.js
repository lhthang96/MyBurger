import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
 
import classes from './SignIn.css';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class SignIn extends Component {
  state = {
    inputControls: {
      email: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Email',
          type: 'email'
        },
        label: 'Email',
        value: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Password',
          type: 'password'
        },
        label: 'Password',
        value: ''
      }
    }
  }

  inputChangedHandler = (event, itemId) => {
    const updatedInputControls = {
      ...this.state.inputControls,
      [itemId]: {
        ...this.state.inputControls[itemId],
        value: event.target.value
      }
    }
    this.setState({inputControls: updatedInputControls});
  }

  onSignInSendHandler = (event, email, password) => {
    event.preventDefault();
    this.props.onSignInSend(email, password);
  }

  render () {
    const authFormElementsArray = [];
    for (let key in this.state.inputControls) {
      authFormElementsArray.push({
        id: key,
        config: this.state.inputControls[key]
      });
    }

    const authForm = authFormElementsArray.map(item => (
      <div className={classes.AuthInputItem} key={item.id}>
        <Input 
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          label={item.config.label}
          value={item.config.value}
          changed={(event) => this.inputChangedHandler(event, item.id)}
          rules={{required: true}} />
      </div>
    ))

    const errorMessage = this.props.error ? <p style={{color: 'red'}}>{this.props.error.message}</p> : null;

    let form = <Spinner isShow />;

    if (!this.props.loading) {
      form = (
        <form onSubmit={(event) => this.onSignInSendHandler(event, this.state.inputControls.email.value, this.state.inputControls.password.value)}>
          {errorMessage}
          {authForm}
          <p>Didn't have an account? <span><Link to='/signup' className={classes.PrimaryText}>Sign Up</Link></span> now.</p>
          <Button btnType='Success'>Submit</Button>
        </form>
      )
    }

    let redirect = null;

    if (this.props.isAuthenticated) {
      if (this.props.building) {
        redirect = <Redirect to='/burger-builder/checkout' />
      } else {
        redirect = <Redirect to ='/' />
      }
    }

    return (
      <div className={classes.AuthSection}>
        {redirect}
        <div className={classes.AuthBox}>
          <h3>Sign In</h3>
          {form}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    error: state.auth.error,
    building: state.burgerBuilder.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignInSend: (email, password) => dispatch(actions.signinSend(email, password))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);