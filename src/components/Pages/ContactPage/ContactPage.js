import React from 'react';

import classes from './ContactPage.css'

// import BurgerStore from '../../../assets/images/burger_store.jpg';

export default () => (
  <div className={classes.ContactPage}>
    <div className={classes.ContactContent}>
      <div className={classes.ContactItem}>
        <p><strong>Address:</strong> 19A Test Street, Ward Test Also, District Test Too, And Test City.</p>
      </div>

      <div className={classes.ContactItem}>
        <p><strong>Phone:</strong> (+84) 359 532 535</p>
      </div>

      <div className={classes.ContactItem}>
        <p><strong>Email:</strong> myburger@gmail.com</p>
      </div>
    </div>
  </div>
)