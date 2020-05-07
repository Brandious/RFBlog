import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'normalize.css';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={home}/>
                <Route exact path="/login" component={login}/> 
                <Route exact path="/signup" component={signup}/>
                <Route exact path="/dashboard" component={dashboard}/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
