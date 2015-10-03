import './styles/common/common.scss';
import React from 'react';
import Auth from './../utils/auth';


var HowToApp = React.createClass({

  componentWillMount() {
    Auth.onChange = this.updateAuth;
    Auth.login()
  },

  updateAuth(loggedIn, name) {
    alert('logged in ' + loggedIn + ' ' + name);
    //this.setState({
    //  loggedIn: loggedIn
    //})
  },

  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <h1>HowTo</h1>
        {this.props.children}
      </div>
    )
  }

});

export default HowToApp;
