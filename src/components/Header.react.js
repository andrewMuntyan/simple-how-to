import React from 'react';
import QuestionActions from '../actions/QuestionActions';
import QuestionTextInput from './QuestionTextInput.react';

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header id="header">
        <h1>Questions!</h1>
        <QuestionTextInput
          id="new-question"
          placeholder="Ask here"
          onSave={this._onSave}
        />
      </header>
    );
  },

  /**
   * Event handler called within QuestionTextInput.
   * Defining this here allows QuestionTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      QuestionActions.create(text);
    }

  }

});

export default Header;