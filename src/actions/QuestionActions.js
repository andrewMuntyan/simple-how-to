/*
 *
 * TodoActions
 */
import AppDispatcher from  '../dispatcher/AppDispatcher';
import QuestionConstants from '../constants/QuestionConstants';

var QuestionActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    console.log('QuestionActions create '+text);
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the Question item
   * @param  {string} text
   */
  editQuestion: function(id, text) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_EDIT,
      id: id,
      text: text
    });
  },

  /**
   * @param  {string} userName The ID of the Question item
   * @param  {string} text
   */
  addAnswer: function(userName, text) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_ADD_ANSWER,
      userName: userName,
      text: text
    });
  }
};

export default QuestionActions;
