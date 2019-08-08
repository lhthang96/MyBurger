import React from 'react';
// import {Link} from 'react-router-dom';

import classes from './HomePage.css'
import BurgerStoreImage from '../../../assets/images/burger_store.jpg';
// import ChefSectionImage from '../../../assets/images/chef_section_image.jpg'

export default () => {
  window.scrollTo(0, 0);
  return (
    <div className={classes.HomePage}>
      <div className={classes.Content}>
        <div className={classes.whiteSection}>
          <h2 className={classes.sectionTitle}>MyBurger</h2>
          <div className={'row noMargin noPadding ' + classes.SectionContent}>
            <div className='col-lg-3 col-sm-6 col-12 noMargin noPadding'>
              <div className={classes.imageBox}>
                <img src={BurgerStoreImage} alt="burger store" className='img-fluid' />
              </div>
            </div>

            <div className='col-lg-9 col-sm-6 col-12 noMargin noPadding'>
              <p className={classes.SectionText}>
              Lorem ipsum dolor sit amet, est assentior deseruisse ei, deserunt vituperatoribus per eu, duo ea partiendo dignissim. Altera offendit sed ex. Ullum soluta fastidii qui ut, idque oblique consectetuer quo in. Affert tantas aliquip ut duo, etiam virtute repudiare usu ei, id atomorum appellantur pro.
              </p><br />
              <p className={classes.SectionText}>
              Lorem ipsum dolor sit amet, est assentior deseruisse ei, deserunt vituperatoribus per eu, duo ea partiendo dignissim. Altera offendit sed ex.
              </p><br />
              <p className={[classes.SectionText, classes.DesktopOnly].join(' ')}>
              Lorem ipsum dolor sit amet, est assentior deseruisse ei, deserunt vituperatoribus per eu, duo ea partiendo dignissim. Altera offendit sed ex. Lorem ipsum dolor sit amet, est assentior deseruisse ei, deserunt vituperatoribus per eu, duo ea partiendo dignissim. Altera offendit sed ex. Lorem ipsum dolor sit amet, est assentior deseruisse ei, deserunt vituperatoribus per eu, duo ea partiendo dignissim. Altera offendit sed ex. Lorem ipsum dolor sit amet, est assentior deseruisse ei, deserunt vituperatoribus per eu, duo ea partiendo dignissim. Altera offendit sed ex.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}