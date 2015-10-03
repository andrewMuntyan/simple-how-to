/*
 *
 * UserStore
 */
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import UserConstants from '../constants/UserConstants';
import Auth from './../utils/auth';
import assign from 'object-assign';

let CHANGE_EVENT = 'change';
let existingQuestions = localStorage.getItem('_questions');

let _userName = '';

const UserStore = assign({}, EventEmitter.prototype, {

  /**
   * Check user authorization status.
   * @return {object}
   */
  checkPermissions() {
    return {
      userName: Auth.getName()
    }
  },

  /**
   * Get current user info
   * @return {string}
   */
  getCurrentUser() {
    return _userName
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

  switch(action.actionType) {
    case UserConstants.LOGIN:
      _userName = action.userName;
      Auth.login(action.userName, action.loginCb);
      break;

    case UserConstants.LOGOUT:
      Auth.logout();
      break;

    default:
    // no op
  }
});

export default UserStore;
