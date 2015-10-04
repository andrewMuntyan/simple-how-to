import './../__styles/q-single-screen.scss';
import React from 'react';
import QuestionsStore from './../../stores/QuestionsStore';
import QuestionActions from '../../actions/QuestionActions';
import QuestionTextInput from './../common/TextInput.react.js';
import AnswerItem from './AnswerItem.react';
import classNames from 'classnames';
import UserStore from './../../stores/UserStore';
import Paper from 'material-ui/lib/paper.js';
import Avatar from 'material-ui/lib/avatar';


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

  /**
   * Event handler for 'change' events coming from the QuestionsStore
   */
    _onChange() {
    this.setState({
      question: QuestionsStore.getById(this.state.questionId)
    })
  },

  _onAnswer(text) {
    if (text.trim()) {
      QuestionActions.addAnswer(text, this.state.questionId);
    }
  },

  /**
   *
   * @param {string} questionId
   * @param {string} answerId
   */
  setChosenState(questionId, answerId) {
    QuestionActions.setChosenAnswer(questionId, answerId);
  },

  /**
   * @return {object}
   */
  render() {
    return this.state.question ? this.renderQuestionScreenView() : this.renderErrorView()
  },

  /**
   *
   * @return {object}
   */
  renderQuestionScreenView() {
    let question = this.state.question;
    let questionItemViewClassNames = classNames({
      'completed': question.hasChosenAnswer,
      'q-single-screen': true
    });
    //let answers = question.answers.map(this.renderAnswerItem);
    let answers = question.answers.map((answer) => {
      return <AnswerItem answer={answer} question={question}/>
    });
    //TODO: move this function to shared helper
    let authorFirstLetter = question.author[0];
    return(
      <div className={questionItemViewClassNames}>
        <h1 className='single-question-heading'>
          Question by <Avatar size="30">{authorFirstLetter}</Avatar> {question.author}
        </h1>

        <Paper zDepth={2} style={{
          padding: 15,
          marginBottom: 25
        }}>
          {question.text}
        </Paper>

        {this.renderAnswerForm()}

        {
          answers.length ?
            <ul className="q-answers-list">{answers}</ul> :
            'There are no answers yet'
        }
      </div>
    );
  },

  /**
   *
   * @return {object}
   */
  renderAnswerForm() {
    return (
      <div className="answer-form">
        <QuestionTextInput
          id="new-answer"
          placeholder="Answer here"
          onSave={this._onAnswer}
          fullWidth={true}
          disabled={this.state.question.hasChosenAnswer}
          //TODO: move textInput styles to shared place
          style={{
              fontSize: '26px',
              height: '85px',
              marginTop: '15px',
              marginBottom: '15px'
            }}
          />
      </div>
    );
  },

  /**
   *
   * @return {object}
   */
  renderErrorView() {
    return(
      <div>
        <h1>There is no question with id {this.state.questionId}</h1>
        <Link to='/'>Look for a new one here</Link>
      </div>
    );
  }

});

export default QuestionView;
