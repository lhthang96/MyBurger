import React from 'react';
import {Link} from 'react-router-dom';

import classes from './UserItem.css';

export default (props) => {
  let itemColorClass;
  switch (props.type) {
    case 'success':
      itemColorClass = classes.SuccessItem;
      break;
    case 'danger':
      itemColorClass = classes.DangerItem
      break;
    default:
      itemColorClass = null;
      break;
  }

  return (
    <li className={classes.UserItem}>
      <Link to={props.link} className={[classes.UserItemLink, itemColorClass].join(' ')}>{props.children}</Link>
    </li>
  )
} 