import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

import Spinner from '../../components/UI/Spinner/Spinner';

export default (importedComponent) => {

  class LazyC extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      this.props.loadingPage();
      importedComponent()
        .then(component => {
          this.setState({component: component.default});
          this.props.loadedPage();
        })
    }

    render() {
      const LazyComponent = this.state.component;
      if (this.props.loading) {
        return <div style={{width:'100%', minHeight: '80vh',display:'flex',justifyContent:'center',alignItems:'center'}}><Spinner isShow /></div>
      } else {
        return LazyComponent ? <LazyComponent {...this.props} /> : null;
      }
    }
  }

  const mapStateToProps = state => {
    return {
      loading: state.page.loadingPage
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      loadingPage: () => dispatch(actions.pageLoading()),
      loadedPage: () => dispatch(actions.pageLoaded())
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(LazyC);
}