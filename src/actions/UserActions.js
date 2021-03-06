/*
 *
 * UserActions
 */
import AppDispatcher from  '../dispatcher/AppDispatcher';
import UserConstants from '../constants/UserConstants';

var UserActions = {

  /**
   *
   * @param  {string} userName
   * @param  {function} loginCb callback function will be invoked after login
   */
  login: function(userName, loginCb) {
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGIN,
      userName: userName,
      loginCb: loginCb
    });
  },

  /**
   *
   */
  logout: function(cb) {
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGOUT,
      cb: cb
    });
  }
};

export default UserActions;
