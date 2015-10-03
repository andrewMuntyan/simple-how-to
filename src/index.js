import React from 'react';
import UserStore from './stores/UserStore';
import HowToApp from './components/HowToApp.react';
import QuestionsList from './components/listScreen/QuestionsList.react.js';
import QuestionView from './components/ItemScreen/QuestionView.react.js';
import Login from './components/common/Login.react.js';
import { Router, Route, IndexRoute, Redirect} from 'react-router';

React.render((
  <Router>
    <Route path="/" component={HowToApp} onEnter={requireAuth}>
      <IndexRoute component={QuestionsList}/>
      <Route path="question/:id" component={QuestionView} />
      <Route path="login" component={Login} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
), document.getElementById('root'));


function requireAuth(nextState, replaceState) {
  //debugger

  let hasPermissions = UserStore.hasPermissions();
  if (!hasPermissions && nextState.location.pathname !== '/login') {
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
}