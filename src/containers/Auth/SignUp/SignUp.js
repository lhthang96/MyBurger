import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
 
import classes from './SignUp.css';
import {formValidation} from '../../../store/utility';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class SignUp extends Component {
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
      },
      passwordConfirmed: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Confirmed password',
          type: 'password'
        },
        label: 'Confirm password',
        value: '',
        isTouched: false,
        shouldValidate: true,
        isValid: false,
        errorMessage: [],
        rules: {
          required: true,
          isPasswordConfirm: true
        }
      }
    }
  }

  componentDidMount() {
    this.props.signupReset();
    this.props.errorReset();
  }

  onCheckFormValid = () => {
    const checkForm = {
      ...this.state.inputControls
    };
    for (let key in checkForm) {
      if (!checkForm[key].isValid) {
        return false;
      }
    }
    return true;
  }

  inputChangedHandler = (event, itemId) => {
    const updatedInputControls = {
      ...this.state.inputControls,
      [itemId]: {
        ...this.state.inputControls[itemId],
        value: event.target.value,
        isValid: formValidation(event.target.value, this.state.inputControls[itemId].rules, this.state.inputControls.password.value).isValid,
        errorMessage: formValidation(event.target.value, this.state.inputControls[itemId].rules).errorMessage,
        isTouched: true
      }
    };
    this.setState({inputControls: updatedInputControls});
  }

  onSignUpSendHandler = (event, email, password) => {
    event.preventDefault();
    this.props.onSignUpSend(email, password);
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

    let form = <Spinner isShow />;
    const errorMessage = this.props.error ? <p style={{color: 'red'}}>{this.props.error}</p> : null;

    if (!this.props.loading) {
      form = (
        <form onSubmit={(event) => this.onSignUpSendHandler(event, this.state.inputControls.email.value, this.state.inputControls.password.value)}>
          {errorMessage}
          {authForm}
          <Button
            btnType='Success'
            disabled={!this.onCheckFormValid()}
          >Submit</Button>
        </form>
      )
    }

    if (this.props.signupSuccess) {
      return (
        <div className={classes.AuthSection}>
          <p>You've sign up successfully. <span><Link to='/signin' className={classes.SuccessText}>Sign in</Link></span> now.</p>
        </div>
      )
    }

    return (
      <div className={classes.AuthSection}>
        {this.props.isAuthenticated ? <Redirect to='/' /> : null }
        <div className={classes.AuthBox}>
          <h3>Sign Up</h3>
          {form}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    signupSuccess: state.auth.signupSuccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignUpSend: (email, password) => dispatch(actions.signupSend(email, password)),
    signupReset: () => dispatch(actions.signupReset()),
    errorReset: () => dispatch(actions.errorReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);