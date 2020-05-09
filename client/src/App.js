import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'normalize.css';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import dashboard from './pages/dashboard';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#33c9dc',
			main: '#61abe8',
			dark: '#d50000',
			contrastText: '#fff'
		}
	}
});


function App() {
  return (
    <MuiThemeProvider theme = {theme}>
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
    </MuiThemeProvider>
  );
}

export default App;
