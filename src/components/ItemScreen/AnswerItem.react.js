import React, {PropTypes} from 'react';
import classNames from 'classnames';
import QuestionActions from '../../actions/QuestionActions';

let AnswerItem = React.createClass({

  propTypes: {
    answer: PropTypes.object.isRequired
  },

  setChosenState() {
    QuestionActions.setChosenAnswer(this.props.answer.questionId, this.props.answer.id);
  },

  /**
   * @return {object}
   */
  render: function() {
    let answer = this.props.answer;
    return (
      <li
        className={classNames({
          'chosen': answer.isChosen
        })}
        >
        <div className="answer-view">
          {answer.text} by {answer.author}
          {this.props.showChoseBtn ? this.renderChoseBtn(answer) : null}
        </div>
      </li>
    );
  },

  /**
   * @return {object}
   */
  renderChoseBtn(answer) {
    return (
      <button onClick={this.setChosenState}>
        {answer.isChosen ? 'I changed my mind' : 'This one is correct'}
      </button>
    );
  }

});

export default AnswerItem;


