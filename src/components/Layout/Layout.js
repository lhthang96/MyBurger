import React from 'react';
import classes from './Layout.css';

import Auxiliary from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <Auxiliary>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Auxiliary>
);

export default layout;