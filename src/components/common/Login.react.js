import React from 'react';
import UserStore from './../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import QuestionTextInput from './TextInput.react.js';
import Auth from './../../utils/auth';
import { Router, Route, Link, History } from 'react-router'

//import classNames from 'classnames';



let LoginView = React.createClass({
  mixins: [ History ],

  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <h1>You must be authorized to continue to use this service</h1>
        <QuestionTextInput
          id="login-input"
          placeholder="Type Name here"
          onSave={this._onLogin}
          ref='loginField'
          />
        <button onClick={this._onBtnClick}>Do it!</button>
      </div>
    );
  },

  /**
   *
   *
   */
  _onBtnClick() {
    this._onLogin(this.refs.loginField.value)
  },

  /**
   * Login action
   * @param {string} userName
   */
  _onLogin(userName) {
    UserActions.login(userName, (loggedIn) => {
      var { location } = this.props;

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname)
      } else {
        this.history.replaceState(null, '/')
      }
    })
  }
});

export default LoginView;
