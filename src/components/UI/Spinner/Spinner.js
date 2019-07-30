import React from 'react';

import classes from './Spinner.css';

const spinner = (props) => {
  return (
    <div className={props.isShow ? classes.ShowSpinner : classes.CloseSpinner}>
      <div className={classes.Loader}>Loading...</div>
    </div>
  );
}

export default spinner;