import React from 'react';
import QuestionActions from '../../actions/QuestionActions';
import QuestionTextInput from './../common/TextInput.react';
import UserStore from './../../stores/UserStore';

var Header = React.createClass({

  getInitialState() {
    return {
      user: UserStore.getCurrentUser()
    }
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render() {
    return (
      <header id="header">
        <h1>Questions!</h1>
        <div className="filter">
          <button onClick={this.filter.bind(null, 'unanswered')}>Unanswered</button>
          <button onClick={this.filter.bind(null, 'answered')}>Answered</button>
          <button onClick={this.filter.bind(null, 'all')}>All</button>
        </div>
        {this.renderQuestionInput()}
      </header>
    );
  },

  renderQuestionInput() {
    return(
      UserStore.hasPermissions() ?
        <QuestionTextInput
          id="new-question"
          placeholder="Ask here"
          onSave={this._onSave}
        /> :
        null
    );
  },

  /**
   * Event handler called within QuestionTextInput.
   * Defining this here allows QuestionTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave(text) {
    if (text.trim()){
      QuestionActions.create(text);
    }
  },

  filter(type) {
    QuestionActions.filterQuestions(type);
  },

  _onChange() {
    this.setState({user: UserStore.getCurrentUser()})
  }

});

export default Header;