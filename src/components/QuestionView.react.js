import './styles/common/common.scss';
import React from 'react';
import QuestionsStore from './../stores/QuestionsStore';
import QuestionActions from '../actions/QuestionActions';
import QuestionTextInput from './QuestionTextInput.react';


let QuestionView = React.createClass({
  getInitialState() {
    return {
      question: QuestionsStore.getById(this.props.routeParams.id)
    };
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
  render: function() {
    console.log(this.props);
    console.log(this.state);
    return (
      <h1>Ololo</h1>
    );
  },

  /**
   * Event handler for 'change' events coming from the QuestionsStore
   */
  _onChange: function() {
    //this.setState(getQuestions());
  }

});

export default QuestionView;
