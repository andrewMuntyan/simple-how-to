import React, {PropTypes} from 'react';
import QuestionActions from '../actions/QuestionActions';
import QuestionTextInput from './QuestionTextInput.react';
import { Router, Route, Link, IndexRoute } from 'react-router'
import classNames from 'classnames';

let QuestionItem = React.createClass({

  propTypes: {
    question: PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    let question = this.props.question;

    let input;
    if (this.state.isEditing) {
      input =
        <QuestionTextInput
          className="edit"
          onSave={this._onSave}
          value={question.text}
          />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    return (
      <li
        className={classNames({
          'completed': question.hasChosenAnswer,
          'editing': this.state.isEditing
        })}
        key={question.id}>
        <div className="view">
          <Link to={`/question/${question.id}`} title={question.text}>{question.text}</Link>
          <label onDoubleClick={this._onDoubleClick}>
            {question.text}
          </label>
        </div>
        {input}
      </li>
    );
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within QuestionTextInput.
   * Defining this here allows QuestionTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    QuestionActions.editQuestion(this.props.question.id, text);
    this.setState({isEditing: false});
  }

});

export default QuestionItem;

