import React, {Component} from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import NotifBox from './NotifBox/NotifBox';

const withNotifHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      showNotif: false
    }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });

      axios.interceptors.response.use(res => {
        this.setState({showNotif: true});
        this.autoHideNotif();
        return res;
      }, error => {
        this.setState({error: error, showNotif: true});
        this.autoHideNotif();
      });
    };

    autoHideNotif = () => {
      setTimeout(() => {
        this.setState({showNotif: false})
      }, 5000);
    }

    closeNotifHandler = () => {
      this.setState({showNotif: false});
    }

    render() {
      let notif = this.state.error ?
        {
          title: 'Error',
          message: this.state.error.message
        } : {
          title: 'Success',
          message: 'Your order will be deliveried as soon as possible.'
        };

      return (
        <Auxiliary>
          <NotifBox
            error={this.state.error}
            isShow={this.state.showNotif}
            closeNotifHandler={this.closeNotifHandler}
            title={notif.title}
            message={notif.message}
          ></NotifBox>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      )
    }
  }
}

export default withNotifHandler;