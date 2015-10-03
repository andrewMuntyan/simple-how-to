import './__styles/common/common.scss';
import React from 'react';
import UserStore from './../stores/UserStore';
import UserActions from '../actions/UserActions';
import { Router, Route, Link, History } from 'react-router'


var HowToApp = React.createClass({

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
      <div>
        <Link to='/'><h1>HowTo logo</h1></Link>
        <h2>
          {this.state.user ? this.renderLogged() : this.renderUnlogged()}
        </h2>

        {this.props.children}
      </div>
    )
  },

  renderLogged() {
    return(
      <div>
        <h2>{this.state.user}</h2>
        <button onClick={this.logout}>Log out</button>
      </div>
    );
  },

  renderUnlogged() {
    if (this.props.location.pathname !== '/login') {
      return(
        <div>
          <h2>You should be logged in</h2>
          <Link to='/login'>Login</Link>
        </div>
      )
    }

    return null;
  },

  logout() {
    UserActions.logout(() => {
      this.history.replaceState(null, '/')
    })
  },

  _onChange() {
    this.setState({user: UserStore.getCurrentUser()})
  }

});

export default HowToApp;
