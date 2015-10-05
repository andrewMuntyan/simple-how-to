import React, {PropTypes} from 'react';
import TextField from 'material-ui/lib/text-field';
import Snackbar from 'material-ui/lib/snackbar';

var QuestionTextInput = React.createClass({

  propTypes: {
    className: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    value: PropTypes.string
  },

  getInitialState() {
    return {
      value: this.props.value || ''
    };
  },

  /**
   * @return {object}
   */
  render() /*object*/ {
    return (
      <TextField
        floatingLabelText={this.props.placeholder}
        onEnterKeyDown={this.save}
        onClick={this.onClick}
        type="text"
        onChange={this.onChange}
        value={this.state.value}
        fullWidth={this.props.fullWidth}
        style={this.props.style}
        disabled={this.props.disabled}
      />
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  save() {
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
  onChange(/*object*/ event) {
    this.setState({
      value: event.target.value
    });
  },
  
  onClick() {
    if (this.props.disabled) {
      let snackbar = React.render(
        <Snackbar
          message="You already have the correct answer. So, You can't add more answers"
          autoHideDuration={5000}
          style={{
            position: 'fixed',
            left: 15,
            bottom: 15
          }}
          />,
        document.querySelector('#popoverContainer')
      );
      snackbar.show()
    }
  },

  getValue(){
    return this.state.value
  }

});

export default QuestionTextInput;
