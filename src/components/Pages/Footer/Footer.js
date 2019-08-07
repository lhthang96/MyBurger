import React from 'react';
// import {Link} from 'react-router-dom';

import classes from './Footer.css';

// import FacebookIcon from '../../../assets/icons/fb.png';
// import TwitterIcon from '../../../assets/icons/twitter.png';
// import InstagramIcon from '../../../assets/icons/instagram.png';

export default () => (
  <div className={classes.Footer}>
    <div className={classes.FooterContent}>
      {/* <div className={classes.FooterLinkBox}>
        <div className={'row noPadding noMargin ' + classes.FooterRow}>
          <div className='col-6 noMargin noPadding'>
            <div className={classes.SocialBox}>
              <Link to='/'><img src={FacebookIcon} alt="facebook icon" className='img-fluid' /></Link>
              <Link to='/'><img src={TwitterIcon} alt="twitter icon" className='img-fluid' /></Link>
              <Link to='/'><img src={InstagramIcon} alt="instagram icon" className='img-fluid' /></Link>
            </div>
          </div>

          <div className='col-6 noMargin noPadding'>
            <div className={classes.MoreInfoBox}>
              <Link to='/'><p>Terms of Service</p></Link>
              <Link to='/'><p>Policy of Privacy</p></Link>
            </div>
          </div>
        </div>
      </div>

      <hr /> */}

      <p>Lorem ipsum dolor sit amet, est assentior deseruisse ei, deserunt vituperatoribus per eu, duo ea partiendo dignissim. Altera offendit sed ex. Ullum soluta fastidii qui ut, idque oblique consectetuer quo in. Affert tantas aliquip ut duo, etiam virtute repudiare usu ei, id atomorum appellantur pro.</p>
    </div>
  </div>
)