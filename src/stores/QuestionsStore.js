/*
 *
 * QuestionsStore
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import QuestionConstants from '../constants/QuestionConstants';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var _questions = {};

/**
 * Create a Question item.
 * @param  {string} text The content of the Question
 */
function create(text, author) {

  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _questions[id] = {
    id: id,
    hasCorrectAnswer: false,
    text: text,
    author: author
  };
  console.log('QuestionsStore create');
  console.log('---');
  console.log('_questions');
  console.log(_questions);
  console.log('---');
  console.log();

}

/**
 * Update a Question item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _questions[id] = assign({}, _questions[id], updates);
  console.log('---');
  console.log('_questions');
  console.log(_questions);
  console.log('---');
  console.log();

}

var QuestionStore = assign({}, EventEmitter.prototype, {

  /**
   * Get Questions that have correct answer.
   * @return {object}
   */
  getWithAnswer: function() {
    //TODO: finish this method
    //for (var id in _questions) {
    //  if (!_questions[id].hasCorrectAnswer) {
    //    return false;
    //  }
    //}
    //return true;
  },

  /**
   * Get Questions that does not have correct answer.
   * @return {object}
   */
  getWithoutAnswer: function() {
    //TODO: finish this method
    //for (var id in _questions) {
    //  if (!_questions[id].hasCorrectAnswer) {
    //    return false;
    //  }
    //}
    //return true;
  },

  /**
   * Get the entire collection of Questions.
   * @return {object}
   */
  getAll: function() {
    return _questions;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case QuestionConstants.QUESTION_CREATE:
      console.log('QuestionConstants.QUESTION_CREATE');
      text = action.text.trim();
      if (text !== '') {
        create(text, action.author);
        QuestionStore.emitChange();
      }
      break;

    case QuestionConstants.QUESTION_EDIT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        QuestionStore.emitChange();
      }
      break;

    case QuestionConstants.QUESTION_ADD_ANSWER:
      //TODO: finish this method
      break;

    default:
    // no op
  }
});

export default QuestionStore;
