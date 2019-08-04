import React from 'react';

import classes from './Input.css';

export default (props) => {
  let inputElement = null;
  let inputElementClass = [classes.inputElement];

  if (!props.isValid) {
    inputElementClass.push(classes.Invalid);
  } else {
    inputElementClass.push(classes.Valid)
  }

  const errorBox = () => {
    if (!props.isValid && props.errorMessage) {
      let list = props.errorMessage.map(item => {
        return <p key={item}>{item}</p>
      });
      return (list);
    }
  }

  switch (props.elementType) {
    case ('text-area') :
      inputElement = <textarea className={classes.inputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />
      break;
    case ('select') :
      inputElement = 
      (<select className={classes.selectElement} multiple={false} onChange={props.changed}>
        {props.elementConfig.options.map(item => (
          <option value={item.value} key={item.value}>{item.displayText}</option>
        ))}
      </select>);
      break;
    default:
      inputElement = <input 
        className={inputElementClass.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed} />
      break;
  }

  return (
    <div className={classes.InputItem}>
      <label>{props.label} <span className={classes.requiredSymbol}>{props.rules.required ? '*' : null}</span></label>
      {inputElement}
      <div className={classes.ErrorBox}>
        {errorBox()}
      </div>
    </div>
  )
}