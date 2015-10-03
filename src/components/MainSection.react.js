import React, {PropTypes} from 'react';
import QuestionActions from '../actions/QuestionActions';
import QuestionTextInput from './QuestionTextInput.react';
import QuestionItem from './QuestionListItem.react.js';

let MainSection = React.createClass({

  propTypes: {
    allQuestions: PropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are Questions.
    //if (Object.keys(this.props.allQuestions).length < 1) {
    //  return null;
    //}

    var allQuestions = this.props.allQuestions;
    var questions = [];

    for (var key in allQuestions) {
      questions.push(<QuestionItem key={key} question={allQuestions[key]} />);
    }

    return (
      <section id="main">
        <ul id="questions-list">{questions}</ul>
      </section>
    );
  },

});

export default MainSection;
