import './../__styles/q-list-item.scss';
import React, {PropTypes} from 'react';
import QuestionActions from '../../actions/QuestionActions';
import QuestionTextInput from './../common/TextInput.react.js';
import { Router, Route, Link, IndexRoute } from 'react-router'
import classNames from 'classnames';
import UserStore from './../../stores/UserStore';

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
          'editing': this.state.isEditing,
          'q-list-item': true
        })}
        key={question.id}>
        <div className="view">

          <label onDoubleClick={this._onDoubleClick}>
            {question.text} by {question.author}
          </label>
          <Link to={`/question/${question.id}`}>more...</Link>
        </div>
        {input}
      </li>
    );
  },

  _onDoubleClick: function() {
    let question = this.props.question;
    if (UserStore.getCurrentUser() === question.author) {
      this.setState({isEditing: true});
    }

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

