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
   * @param  {object} location object with information about location from RR
   */
  login: function(userName, loginCb) {
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGIN,
      userName: userName,
      loginCb: loginCb
    });
  },

  /**
   * @param  {string} userName
   */
  logout: function(userName) {
    AppDispatcher.dispatch({
      actionType: UserConstants.LOGOUT,
      userName: userName
    });
  }
};

export default UserActions;
