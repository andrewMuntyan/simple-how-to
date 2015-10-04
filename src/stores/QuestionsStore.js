/*
 *
 * QuestionsStore
 */

import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import QuestionConstants from '../constants/QuestionConstants';
import UserStore from './UserStore';


let CHANGE_EVENT = 'change',
  existingQuestions = localStorage.getItem('_questions'),
  _questions = existingQuestions ? JSON.parse(existingQuestions) : {},
  _displayedQuestions = _questions;


/**
 * Get "random" id.
 *
 */
function getId() {
  // Using the current timestamp + random number in place of a real id.
  return (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
}

/**
 * Create a Question item and save Questions in localstore
 * @param  {string} text The content of the Question
 *
 */
function create(text) {
  if(UserStore.hasPermissions()){
    let id = getId();
    _questions[id] = {
      id: id,
      created: +new Date(),
      hasChosenAnswer: false,
      text: text,
      author: UserStore.getCurrentUser(),
      answers: []
    };
    syncCollection();
  } else {
    console.error('You do not have permissions');
    //TODO: add redirecting to login page
  }
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
    created: +new Date(),
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
 * set to _displayedQuestions array with only requested type question
 * @param  {string} type
 */
function filterQuestions (type) {
  switch(type) {
    case 'unanswered':
      _displayedQuestions = objectFilter(_questions, (question) => {
        return !question.hasChosenAnswer
      });

      break;

    case 'answered':
      _displayedQuestions = objectFilter(_questions, (question) => {
        return question.hasChosenAnswer
      });

      break;

    default:
      _displayedQuestions = objectFilter(_questions,() => {return true})
  }
  _displayedQuestions = sortItemsInCollection(_displayedQuestions, 'created', -1);
}

/**
 * sort hash by 'prop' property value
 *
 * before
 * {a:{prop: 5}, b:{prop: 1}, c:{prop: 2}}
 *
 * after
 * {b:{prop: 1}, c:{prop: 2}, a:{prop: 5}}
 *
 * @param  {object} obj target hash
 * @param  {string} prop property name
 * @param  {number} type descending (-1) ascending (by default)

 */

function sortItemsInCollection(obj, prop, type) {
  let temp_array = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp_array.push(key);
    }
  }
  temp_array.sort((a, b) => {
    return (obj[a][prop] - obj[b][prop]) * (type ? type : 1);
  });

  let temp_obj = {};
  for (let i=0; i<temp_array.length; i++) {
    temp_obj[temp_array[i]] = obj[temp_array[i]];
  }
  return temp_obj;
}

//TODO: don't be lazy. use Underscore or lodash next time
function objectFilter (obj, predicate) {
  let result = {}, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && predicate(obj[key])) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Save current questions collection to localStorage.
 */
function syncCollection () {
  localStorage.setItem('_questions', JSON.stringify(_questions));
}

let QuestionStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of Questions.
   * @return {object}
   */
  getAll() {
    return _displayedQuestions = sortItemsInCollection(_displayedQuestions, 'created', -1);
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
      text = action.text.trim();
      if (text !== '') {
        create(text);
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
      if(UserStore.hasPermissions()){
        addAnswer({
          questionId: action.questionId,
          text: action.text.trim(),
          userName: UserStore.getCurrentUser()
        });
        QuestionStore.emitChange();
      } else {
        //TODO: add redirecting to login page
        console.error('You do not have permissions')
      }

      break;

    case QuestionConstants.QUESTION_SET_CHOSEN_ANSWER:
      setChosenAnswer(action.questionId, action.answerId);
      QuestionStore.emitChange();
      break;

    case QuestionConstants.QUESTION_LIST_FILTER:
      filterQuestions(action.type);
      QuestionStore.emitChange();
      break;

    default:
    // no op
  }
});

export default QuestionStore;
