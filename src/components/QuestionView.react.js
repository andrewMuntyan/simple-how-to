import './styles/common/common.scss';
import React from 'react';
import QuestionsStore from './../stores/QuestionsStore';


function getQuestions() {
  return {
    allQuestions: QuestionsStore.getAll(),
    hasAnswer: QuestionsStore.getWithAnswer(),
    doesNotHaveAnswer: QuestionsStore.getWithoutAnswer()
  };
}


var QuestionView = React.createClass({
  getInitialState: function() {
    return getQuestions();
  },

  componentDidMount: function() {
    QuestionsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    QuestionsStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <h1>Ololo</h1>
    );
  },

  /**
   * Event handler for 'change' events coming from the QuestionsStore
   */
  _onChange: function() {
    console.log('---');
    console.log('getQuestions');
    console.log(getQuestions());
    console.log('---');
    console.log();

    this.setState(getQuestions());
  }

});

export default QuestionView;
