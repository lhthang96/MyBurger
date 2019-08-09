import React from 'react';
import {Link} from 'react-router-dom';

import classes from './DoneOrder.css';

export default (props) => (
  props.isAuthenticated ? 
  <div className={classes.DoneOrderSection}>
    <p className={classes.deliText}>Your order was send to us. We will deliver to you as soon as possible.<span><i className="fas fa-shipping-fast fa-2x"></i></span></p>
    <p> Lets check the <span><Link to='/orders' className={classes.SuccessText}>Orders list</Link></span> or <span><Link to='/burger-builder' className={classes.SuccessText}>Build</Link></span> another burger.</p>
  </div> :

  <div className={classes.DoneOrderSection}>
    <p><span className={classes.SuccessText}><i className="fas fa-check fa-4x"></i></span></p>
    <p className={classes.deliText}>Your order was send to us. We will contact you soon for the confirmation.</p>
    <p>If you want to save your orders and get others benifits. We recommend you <span><Link to='/signup' className={classes.SuccessText}>Sign up </Link></span> an account.</p>
  </div>
)