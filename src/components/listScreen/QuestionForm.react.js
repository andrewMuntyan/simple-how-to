import './../__styles/q-list-question-form.scss';
import React from 'react';
import QuestionActions from '../../actions/QuestionActions';
import QuestionsStore from './../../stores/QuestionsStore';
import QuestionTextInput from './../common/TextInput.react';
import UserStore from './../../stores/UserStore';
import Toggle from 'material-ui/lib/toggle.js';

var Header = React.createClass({

  getInitialState() {
    return {
      user: UserStore.getCurrentUser(),
      onlyAnswered: this.props.onlyAnswered || QuestionsStore.getFiltersState('onlyAnswered'),
      onlyUnanswered: this.props.onlyUnanswered || QuestionsStore.getFiltersState('onlyUnanswered')
    }
  },

  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
    QuestionsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
    QuestionsStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render() {
    return (
      <div>
        <h1 className="q-list-heading">We can help You with anything You want ;)</h1>
        <div className="filter">
          <div className="switcher">
            <Toggle
              name="onlyAnswered"
              value="onlyAnswered"
              label="Only answered"
              onToggle={this.filter.bind(null, 'answered')}
              defaultToggled={this.state.onlyAnswered}
              />
          </div>
          <div className="switcher">
            <Toggle
              name="onlyUnanswered"
              value="onlyUnanswered"
              label="Only unanswered"
              onToggle={this.filter.bind(null, 'unanswered')}
              defaultToggled={this.state.onlyUnanswered}
              className="switcher"
              />
          </div>


        </div>
        {this.renderQuestionInput()}
      </div>
    );
  },

  renderQuestionInput() {
    return(
      UserStore.hasPermissions() ?
        <QuestionTextInput
          id="new-question"
          placeholder="Ask here"
          onSave={this._onSave}
          fullWidth={true}
          style={{
            fontSize: '26px',
            height: '85px',
            marginTop: '15px',
            marginBottom: '15px'
          }}
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

  filter(filter, e, filterState) {
    //console.log(arguments);
    //debugger

    /**
    * We need this trick because of behaviour of 'filterState' argument is not correct
    * and we can't rely on it
    * */
    let secondArgument = !this.state[filter === 'answered' ? 'onlyAnswered': 'onlyUnanswered'];
    QuestionActions.filterQuestions(filter, secondArgument);
  },

  _onChange() {
    this.setState({
      user: UserStore.getCurrentUser(),
      onlyAnswered: QuestionsStore.getFiltersState('onlyAnswered'),
      onlyUnanswered: QuestionsStore.getFiltersState('onlyUnanswered')
    })
  }

});

export default Header;