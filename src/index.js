import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import Main from './components/Main';
import Admin from './components/Admin';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Header/>
          <Switch>
            <Route path='/main' component={Main}/>
            <Route path='/admin' component={Admin}/>
            <Route exact path='/' component={Admin}/>
            <Route path='/login' component={Login}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
