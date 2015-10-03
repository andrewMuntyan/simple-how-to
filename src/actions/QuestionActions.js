/*
 *
 * QuestionActions
 */
import AppDispatcher from  '../dispatcher/AppDispatcher';
import QuestionConstants from '../constants/QuestionConstants';

var QuestionActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
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
   *
   * @param  {string} text Answer text
   * @param  {string} questionId
   */
  addAnswer: function(text, questionId) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_ADD_ANSWER,
      text: text,
      questionId: questionId
    });
  },

  /**
   * @param  {string} questionId The ID of the Question item
   * @param  {string} answerId AnswerId
   */
  setChosenAnswer: function(questionId, answerId) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_SET_CHOSEN_ANSWER,
      answerId: answerId,
      questionId: questionId
    });
  }
};

export default QuestionActions;
