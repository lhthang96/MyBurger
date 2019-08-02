import React from 'react';

import classes from './Input.css';

export default (props) => {
  let inputElement = null;

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
      inputElement = <input className={classes.inputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />
      break;
  }

  return (
    <div className={classes.InputItem}>
      <label>{props.label}</label>
      {inputElement}
    </div>
  )
}