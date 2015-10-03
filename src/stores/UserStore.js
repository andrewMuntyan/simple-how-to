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

const UserStore = assign({}, EventEmitter.prototype, {

  /**
   * Check user authorization status.
   * @return {object}
   */
  hasPermissions() {
    return !!(Auth.getName()).length
  },

  /**
   * Get current user info
   * @return {string}
   */
  getCurrentUser() {
    return Auth.getName()
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
      Auth.login(action.userName, action.loginCb);
      UserStore.emitChange();
      break;

    case UserConstants.LOGOUT:
      Auth.logout();
      UserStore.emitChange();
      break;

    default:
    // no op
  }
});

export default UserStore;
