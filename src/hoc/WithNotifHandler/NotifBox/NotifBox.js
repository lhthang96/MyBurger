import React from 'react';

import classes from './NotifBox.css';

const notifBox = (props) => {
  const typeClass = props.error ? classes.ErrorBox : classes.SuccessBox;
  let autoHide = props.isShow ? classes.Show : classes.Close;
  return (
    <div className={[classes.NotifBox, typeClass, autoHide].join(' ')}>
      <div className={classes.CloseButton} onClick={props.closeNotifHandler}>
        x
      </div>
      <div className={classes.NotifContent}>
        <h3>{props.title}</h3>
        <p>{props.message}</p>
      </div>
    </div>
  )
}

export default notifBox;