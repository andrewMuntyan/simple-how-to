import './../__styles/login-block.scss';
import React from 'react';
import UserStore from './../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import QuestionTextInput from './TextInput.react.js';
import Auth from './../../utils/auth';
import { Router, Route, Link, History } from 'react-router'
import FlatButton from 'material-ui/lib/flat-button';


let LoginView = React.createClass({
  mixins: [ History ],

  /**
   * @return {object}
   */
  render() {
    return (
      <div className="login-block">
        <QuestionTextInput
          id="login-input"
          placeholder="Type Name here"
          onSave={this._onLogin}
          ref='loginField'
        />
        <FlatButton style={{marginLeft: '10px'}} onClick={this._onBtnClick} label="Let me in" />
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
      if (loggedIn) {
        var { location } = this.props;

        if (location.state && location.state.nextPathname) {
          this.history.pushState(null, location.state.nextPathname)
        } else {
          this.history.pushState(null, '/')
        }
      } else {
        console.error('User name is invalid')
      }
    })
  }
});

export default LoginView;
