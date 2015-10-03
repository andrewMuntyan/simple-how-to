/*
 *
 * QuestionsStore
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import QuestionConstants from '../constants/QuestionConstants';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';
var existingQuestions = localStorage.getItem('_questions');
var _questions = existingQuestions ? JSON.parse(existingQuestions) : {};


/**
 * Get "random" id.
 *
 */
function getId() {
  // Using the current timestamp + random number in place of a real id.
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
}


/**
 * Create a Question item.
 * @param  {string} text The content of the Question
 * @param  {string} author Question Author
 */
function create(text, author) {
  let id = getId();
  _questions[id] = {
    id: id,
    hasChosenAnswer: false,
    text: text,
    author: author,
    answers: []
  };
  syncCollection();
}

/**
 * Update a Question item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update (id, updates) {
  _questions[id] = assign({}, _questions[id], updates);
  syncCollection();
}

/**
 * Add Answer to particular question.
 * @param  {object} params. An object with answer data: userName, text, questionId
 *
 */
function addAnswer (params) {
  _questions[params.questionId]['answers'].push({
    id: getId(),
    questionId: params.questionId,
    text: params.text,
    author: params.userName,
    isChosen: false
  });
  syncCollection();
}

/**
 * Set chosen answer.
 * @param  {string} questionId
 * @param {string} answerId
 */
function setChosenAnswer (questionId, answerId) {
  let question = QuestionStore.getById(questionId);
  let answers = question.answers;
  answers.forEach((answer) => {
    answer.isChosen = answer.id === answerId && !answer.isChosen;
  });
  update(questionId, {hasChosenAnswer: checkChosenAnswer(answers)})
}

/**
 * Check availability of chosen answer in answers array
 * @param  {Array} answers Array of answers
 */
function checkChosenAnswer (answers) {
  return answers.some((answer) => {return answer.isChosen})
}

/**
 * Save current questions collection to localStorage.
 */
function syncCollection () {
  localStorage.setItem('_questions', JSON.stringify(_questions));
}


var QuestionStore = assign({}, EventEmitter.prototype, {

  /**
   * Get Questions that have correct answer.
   * @return {object}
   */
  getWithAnswer() {
    //TODO: finish this method
    //for (var id in _questions) {
    //  if (!_questions[id].hasChosenAnswer) {
    //    return false;
    //  }
    //}
    //return true;
  },

  /**
   * Get Questions that does not have correct answer.
   * @return {object}
   */
  getWithoutAnswer() {
    //TODO: finish this method
    //for (var id in _questions) {
    //  if (!_questions[id].hasChosenAnswer) {
    //    return false;
    //  }
    //}
    //return true;
  },

  /**
   * Get the entire collection of Questions.
   * @return {object}
   */
  getAll() {
    return _questions;
  },

  /**
   * Get Question by id.
   * @param {string} id
   * @return {object}
   */
  getById(id) {
    return _questions[id];
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener(callback) {
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
      addAnswer({
        questionId: action.questionId,
        text: action.text.trim(),
        userName: action.userName
      });
      QuestionStore.emitChange();
      break;

    case QuestionConstants.QUESTION_SET_CHOSEN_ANSWER:
      setChosenAnswer(action.questionId, action.answerId);
      QuestionStore.emitChange();
      break;

    default:
    // no op
  }
});

export default QuestionStore;
