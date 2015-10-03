import './__styles/common/common.scss';
import React from 'react';
import { Link } from 'react-router';
import UserStore from './../stores/UserStore';
import QuestionActions from './../actions/QuestionActions';


var HowToApp = React.createClass({

  componentWillMount() {

  },


  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <Link to='/'><h1>HowTo logo</h1></Link>
        <h2>{UserStore.getCurrentUser()}</h2>
        <Link to='/login'>Logout</Link>
        <div className="filter">
          <button onClick={this.filter.bind(null, 'unanswered')}>Unanswered</button>
          <button onClick={this.filter.bind(null, 'answered')}>Answered</button>
          <button onClick={this.filter.bind(null, 'all')}>All</button>
        </div>
        {this.props.children}
      </div>
    )
  },

  filter(type) {
    QuestionActions.filterQuestions(type);
  }

});

export default HowToApp;
