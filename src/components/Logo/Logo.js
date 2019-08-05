import React from 'react';
import {Link} from 'react-router-dom';

import classes from './Logo.css';

import BurgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => {
  return (
      <div className={classes.LogoBox}>
        <Link to='/' className={classes.LogoLink} onClick={props.closeSideMenuHandler}>
          <div className={classes.LogoContent}>
            <img className={classes.BrandImage} src={BurgerLogo} alt="Burger logo" />
            <span className={classes.BrandName} style={{color: props.brandColor}}>MyBurger</span>
          </div>
        </Link>
      </div>
  );
}

export default logo;