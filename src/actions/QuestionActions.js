/*
 *
 * QuestionActions
 */
import AppDispatcher from  '../dispatcher/AppDispatcher';
import QuestionConstants from '../constants/QuestionConstants';

var QuestionActions = {

  /**
   * @param  {string} filter
   * @param  {boolean} filterState
   */
  filterQuestions(filter, filterState) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_LIST_FILTER,
      filter: filter,
      filterState: filterState
    });
  },

  /**
   * @param  {string} text
   */
  create(text) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the Question item
   * @param  {string} text
   */
  editQuestion(id, text) {
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
  addAnswer(text, questionId) {
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
  setChosenAnswer(questionId, answerId) {
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTION_SET_CHOSEN_ANSWER,
      answerId: answerId,
      questionId: questionId
    });
  }
};

export default QuestionActions;
