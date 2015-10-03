import './../__styles/q-list-screen.scss';
import React from 'react';
import QuestionsStore from './../../stores/QuestionsStore';
import Header from './QuestionForm.react.js';
import QuestionItem from './QuestionListItem.react.js';


function getQuestions() {
  return {
    questions: QuestionsStore.getAll()
  };
}


var QuestionsList = React.createClass({
  getInitialState() {
    return getQuestions();
  },

  componentDidMount() {
    QuestionsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    QuestionsStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render() {
    return (
      <div className='q-list'>
        <Header />
        {this.renderList()}

      </div>

    );
  },
  
  renderList() {
    let questions = [];
    let allQuestions = this.state.questions;
    for (var key in this.state.questions) {
      questions.push(<QuestionItem key={key} question={allQuestions[key]} />);
    }

    return (
      <section id="main">
        <ul id="questions-list">{questions}</ul>
      </section>
    );
  },

  /**
   * Event handler for 'change' events coming from the QuestionsStore
   */
  _onChange() {
    this.setState(getQuestions());
  }

});

export default QuestionsList;
