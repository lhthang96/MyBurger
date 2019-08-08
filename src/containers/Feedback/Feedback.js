import React, {Component} from 'react';

import classes from './Feedback.css';

export default class extends Component {
  render() {
    window.scrollTo(0, 0);
    return (
      <div className={classes.FeedbackBox}>
        Feedback page
      </div>
    )
  }
}