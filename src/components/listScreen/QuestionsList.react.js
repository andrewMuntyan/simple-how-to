import './../__styles/q-list-screen.scss';
import React from 'react';
import QuestionsStore from './../../stores/QuestionsStore';
import Header from './QuestionForm.react.js';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ListDivider from 'material-ui/lib/lists/list-divider';
import Avatar from 'material-ui/lib/avatar';
import { Router, Route, Link, History } from 'react-router';
import muiFix from './../../utils/mui-fix-mixin';


function getQuestions() {
  return {
    questions: QuestionsStore.getAll()
  };
}


var QuestionsList = React.createClass({
  mixins: [ History, muiFix ],

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
      //questions.push(<QuestionItem key={key} question={allQuestions[key]} />);
      let question = allQuestions[key];
      let firstLetter = question.author[0];
      let doneSign = <Avatar
        backgroundColor='green'
        color='white'
        style={{
          top: '15px'
        }}
        >&#10003;</Avatar>;
      questions.push(
        <div key={question.id}>
          <ListItem
            leftAvatar={<Avatar>{firstLetter}</Avatar>}
            primaryText={`${question.author} asks:`}
            secondaryText={
              <p>
                {question.text}
              </p>
            }
            secondaryTextLines={2}
            onClick={this.itemOnClick.bind(this, question.id)}
            rightIconButton={question.hasChosenAnswer ? doneSign : null}

          />
          <ListDivider inset={true} />
        </div>
      );
    }

    return (
      <section id="main">
        {
          questions.length ?
            <List subheader="Questions">{questions}</List> :
            'There are no questions yet'
        }
      </section>
    );
  },

  /**
   * It will throw user to question page
   * @param {string} questionId
   */
  itemOnClick(questionId) {
    this.history.pushState(null, `/question/${questionId}`)
  },


  /**
   * Event handler for 'change' events coming from the QuestionsStore
   */
  _onChange() {
    this.setState(getQuestions());
  }

});

export default QuestionsList;
