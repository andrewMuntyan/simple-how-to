import './styles/common/common.scss';
import React, { Component } from 'react';
import QuestionsStore from './../stores/QuestionsStore';
import Header from './Header.react';
import MainSection from './MainSection.react';


function getQuestions() {
  return {
    allQuestions: QuestionsStore.getAll(),
    hasAnswer: QuestionsStore.getWithAnswer(),
    doesNotHaveAnswer: QuestionsStore.getWithoutAnswer()
  };
}


var HowToApp = React.createClass({
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
      <div>
        <Header />
        <MainSection
          allQuestions = {this.state.allQuestions}
        />

      </div>

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

export default HowToApp;
