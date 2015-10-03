import React from 'react';
import { Router, Route, IndexRoute, Redirect} from 'react-router';

import UserStore from './stores/UserStore';

import HowToApp from './components/HowToApp.react';
import QuestionsList from './components/listScreen/QuestionsList.react.js';
import QuestionView from './components/ItemScreen/QuestionView.react.js';
import Login from './components/common/Login.react.js';


React.render((
  <Router>
    <Route path="/" component={HowToApp}>
      <IndexRoute component={QuestionsList}/>
      <Route path="question/:id" component={QuestionView} onEnter={requireAuth}/>
      <Route path="login" component={Login} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
), document.getElementById('root'));

function requireAuth(nextState, replaceState) {
  let hasPermissions = UserStore.hasPermissions();
  if (!hasPermissions && nextState.location.pathname !== '/login') {
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
  }
}