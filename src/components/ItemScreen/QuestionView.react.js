import '../__styles/common/common.scss';
import React from 'react';
import QuestionsStore from './../../stores/QuestionsStore';
import QuestionActions from '../../actions/QuestionActions';
import QuestionTextInput from './../common/TextInput.react.js';
import AnswerItem from './AnswerItem.react';
import { Link } from 'react-router';
import classNames from 'classnames';
import UserStore from './../../stores/UserStore';


let QuestionView = React.createClass({
  getInitialState() {
    let questionId = this.props.routeParams.id;
    return {
      questionId: questionId,
      question: QuestionsStore.getById(questionId)
    };
  },

  componentDidMount() {
    QuestionsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    QuestionsStore.removeChangeListener(this._onChange);
  },

  renderQuestionView() {
    let question = this.state.question;
    let showChoseBtn = UserStore.getCurrentUser() === question.author;
    let answers = question.answers.map((answer) => {
      return <AnswerItem key={answer.id} answer={answer} showChoseBtn={showChoseBtn}/>;
    });
    let questionClassNames = classNames({
      'completed': question.hasChosenAnswer
    });
    return(
      <div className={questionClassNames}>
        <h1>Question Title</h1>
        <div className="question-body">{question.text}</div>
        {this.renderAnswerForm()}
        <div className="answers-list">{answers}</div>
      </div>
    );
  },

  renderAnswerForm() {
    return this.state.question.hasChosenAnswer ?
      null :
      (
        <div className="answer-form">
          <QuestionTextInput
            id="new-answer"
            placeholder="Answer here"
            onSave={this._onAnswer}
            />
        </div>
      )
  },

  renderErrorView() {
    return(
      <div>
        <h1>There is no question with id {this.state.questionId}</h1>
        <Link to='/'>Look for a new one here</Link>
      </div>
    );
  },

  /**
   * @return {object}
   */
  render() {
    return this.state.question ? this.renderQuestionView() : this.renderErrorView()
  },

  _onAnswer(text) {
    if (text.trim()) {
      QuestionActions.addAnswer(text, this.state.questionId);
    }
  },

  /**
   * Event handler for 'change' events coming from the QuestionsStore
   */
  _onChange() {
    this.setState({
      question: QuestionsStore.getById(this.state.questionId)
    })
  }

});

export default QuestionView;
