import React, {PropTypes} from 'react';
import classNames from 'classnames';
import QuestionActions from '../../actions/QuestionActions';
import UserStore from './../../stores/UserStore';
import FlatButton from 'material-ui/lib/flat-button';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import Avatar from 'material-ui/lib/avatar';

let AnswerItem = React.createClass({

  propTypes: {
    answer: PropTypes.object.isRequired
  },

  setChosenState() {
    QuestionActions.setChosenAnswer(this.props.answer.questionId, this.props.answer.id);
  },

  /**
   * @return {object}
   */
  render: function() {
    let answer = this.props.answer;
    let question = this.props.question;
    let authorFirstLetter = answer.author[0];
    let showChoseBtn = false;
    if (UserStore.getCurrentUser() === question.author) {
      if (question.hasChosenAnswer) {
        showChoseBtn = answer.isChosen
      } else {
        showChoseBtn = true
      }
    }
    return (
      <Card initiallyExpanded={true}>
        <CardHeader
          title={answer.author}
          subtitle="Sad:"
          avatar={<Avatar style={{color: 'red'}}>{authorFirstLetter}</Avatar>}
          showExpandableButton={true}>
        </CardHeader>

        <CardText>
          {answer.text}
        </CardText>

        {showChoseBtn ? this.renderChoseBtn(answer) : null}
      </Card>
    );
  },

  /**
   * @return {object}
   */
  renderChoseBtn(answer) {
    return (
      <CardActions expandable={true}>
        <FlatButton
        style={{
          width: 150,
          fontSize: 12,
          top: 25
        }}
        hoverColor={answer.isChosen ? 'red' : '#00bcd4'}
        onClick={this.setChosenState.bind(null, answer.questionId, answer.id)}
        label={answer.isChosen ? 'I changed my mind' : 'Check as correct'}
        />
      </CardActions>

    );
  }

});

export default AnswerItem;


