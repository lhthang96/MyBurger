import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
 
import classes from './SignIn.css';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

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
        value: '',
        isTouched: false,
        shouldValidate: true,
        isValid: false,
        errorMessage: [],
        rules: {
          required: true
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Password',
          type: 'password'
        },
        label: 'Password',
        value: '',
        isTouched: false,
        shouldValidate: true,
        isValid: false,
        errorMessage: [],
        rules: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  formValidation = (input, rules) => {
    let isValid = true;
    let errorMessage = [];

    if (rules.required) {
      if (input.trim() === '') {
        isValid = false;
        errorMessage.push('This field is required.');
      }
    };

    if (rules.minLength) {
      if (input.length < rules.minLength) {
        isValid = false;
        errorMessage.push('Min length is ' + rules.minLength + ' letters.');
      }
    };

    if (rules.maxLength) {
      if (input.length > rules.maxLength) {
        isValid = false;
        errorMessage.push('Max length is ' + rules.maxLength + ' letters.');
      }
    };

    if (rules.isPhone) {
      if (input.length > 11 || input.length < 10) {
        isValid = false;
        errorMessage.push('Invalid phone number.');
      }
    };

    return ({
      isValid: isValid,
      errorMessage: errorMessage
    });
  }

  inputChangedHandler = (event, itemId) => {
    const updatedInputControls = {
      ...this.state.inputControls,
      [itemId]: {
        ...this.state.inputControls[itemId],
        value: event.target.value,
        isValid: this.formValidation(event.target.value, this.state.inputControls[itemId].rules).isValid,
        errorMessage: this.formValidation(event.target.value, this.state.inputControls[itemId].rules).errorMessage,
        isTouched: true
      }
    }
    this.setState({inputControls: updatedInputControls});
  }

  onAuthSendHandler = (event, email, password) => {
    event.preventDefault();
    this.props.onAuthSend(email, password);
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
          isTouched={item.config.isTouched}
          isValid={item.config.isValid}
          errorMessage={item.config.errorMessage}
          rules={item.config.rules}
        />
      </div>
    ))


    return (
      <div className={classes.AuthSection}>
        <div className={classes.AuthBox}>
          <form onSubmit={(event) => this.onAuthSendHandler(event, this.state.inputControls.email.value, this.state.inputControls.password.value)}>
            {authForm}
            <Button
              btnType='Success'
            >Submit</Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthSend: (email, password) => dispatch(actions.authSend(email, password))
  }
}

export default connect(null,mapDispatchToProps)(SignIn);