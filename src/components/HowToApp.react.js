import './styles/common/common.scss';
import React from 'react';
import { Router, Route, Link, IndexRoute } from 'react-router'


var HowToApp = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <h1>HowTo</h1>
        {this.props.children}
      </div>
    );
  }

});

export default HowToApp;
