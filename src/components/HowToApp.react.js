import './styles/common/common.scss';
import React from 'react';


var HowToApp = React.createClass({

  componentWillMount() {

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
