import React, {PropTypes} from 'react';
let ENTER_KEY_CODE = 13;
import TextField from 'material-ui/lib/text-field';

var QuestionTextInput = React.createClass({

  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    value: PropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      <TextField
        floatingLabelText={this.props.placeholder}
        onEnterKeyDown={this._save}
        type="text"
        onBlur={this._save}
        onChange={this._onChange}
        value={this.state.value}
        fullWidth={this.props.fullWidth}
      />
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    let value = this.state.value;
    if (value && value.length && typeof value === 'string') {
      this.props.onSave(this.state.value);
      this.setState({
        value: ''
      });
    }

  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  }

});

export default QuestionTextInput;
