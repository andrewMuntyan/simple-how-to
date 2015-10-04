import './__styles/common/common.scss';
import React from 'react';
import UserStore from './../stores/UserStore';
import UserActions from '../actions/UserActions';
import { Router, Route, Link, History } from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
import AppBar from 'material-ui/lib/app-bar';


var HowToApp = React.createClass({
  mixins: [ History ],

  getInitialState() {
    return {
      user: UserStore.getCurrentUser()
    }
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render() {
    return (
      <div className="g-container">
        <header id="header" className="g-header">
          <AppBar
            iconElementLeft={
              <Link to='/' className="logo h-left">
                <img src={require("./../../static/img/logo.png")} alt="Logo"/>
              </Link>
            }
            iconElementRight={
              <div className="h-right">
                <div className="usr-blck">
                  {this.state.user ? this.renderLogged() : this.renderUnlogged()}
                </div>
              </div>
            }
            style={{
              minHeight: '65px'
            }}

          />

        </header>

        {this.props.children}
      </div>
    )
  },

  renderLogged() {
    let user = this.state.user;
    let firstLetter = user[0];
    return(
      <div>
        <div className="l-side">
          <Avatar size="35">{firstLetter}</Avatar>
          <h2 className="user-name">{this.state.user}</h2>
        </div>
        <div className="r-side">
          <FlatButton style={{float: 'right'}} onClick={this.logout} label="Log out" />
        </div>
      </div>
    );
  },

  renderUnlogged() {
    if (this.props.location.pathname !== '/login') {
      return(
        <div>
          <div className="r-side">
            <FlatButton onClick={this.login} label="Log in" />
          </div>
        </div>
      )
    }

    return null;
  },

  logout() {
    UserActions.logout(() => {
      this.history.replaceState(null, '/');
    })
  },

  login() {
    this.history.pushState(null, '/login');
  },

  _onChange() {
    this.setState({user: UserStore.getCurrentUser()})
  }

});

export default HowToApp;
