import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import firebase from './components/Firebase';

import Orders from './components/Orders';
import Admin from './components/Admin';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  const [loginStatus, setLoginStatus] = useState('loading');
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // var displayName = user.displayName;
        // var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var uid = user.uid;
        // var phoneNumber = user.phoneNumber;
        // var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
            setLoginStatus('logged in');
        });
      } else {
        setLoginStatus('logged out');
      }

    }, function(error) {
      console.log(error);
    });
  }, []);

  if (loginStatus === 'logged in') {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
            <Switch>
             <Route path='/admin' component={Admin}/>
             <Route path='/' component={Orders}/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
  else if (loginStatus === 'logged out') {
    return <Login/>
  }
  else {
    return <h1 style={{textAlign: 'center', marginTop: '100px'}}>Loading...</h1>
  }
}


ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
