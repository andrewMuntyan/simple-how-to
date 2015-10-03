import React from 'react';
import HowToApp from './components/HowToApp.react.js';
import QuestionsList from './components/QuestionsList.react.js';
import QuestionView from './components/QuestionView.react.js';
import { Router, Route, IndexRoute, Redirect} from 'react-router';



// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
React.render((
  <Router>
    <Route path="/" component={HowToApp}>
      <IndexRoute component={QuestionsList} />
      <Route path="question/:id" component={QuestionView} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
), document.getElementById('root'));