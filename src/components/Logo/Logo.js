import React from 'react';
import classes from './Logo.css';

import BurgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
  return (
    <div className={classes.LogoBox}>
      <img src={BurgerLogo} alt="Burger logo" />
      <span className={classes.BrandName}>MyBurger</span>
    </div>
  );
}

export default logo;