import React from 'react';
import classes from "./Modal.css";

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
  <Auxiliary>
    <Backdrop show={props.isShow} clicked={props.closeModal}/>
    <div 
      className={classes.Modal}
      style={{
        transform: props.isShow ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.isShow ? 1 : 0
      }}
    >{props.children}
    </div>
  </Auxiliary>
)

export default modal;