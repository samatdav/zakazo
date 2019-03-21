import React from 'react';
import '../styles/Login.css';
import firebase from './Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function Login(props) {


	var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            var user = authResult.user;
            // var credential = authResult.credential;
            var isNewUser = authResult.additionalUserInfo.isNewUser;
            // var providerId = authResult.additionalUserInfo.providerId;
            // var operationType = authResult.operationType;

            // TODO: check if bar exist. If not, ask for info and create new Bar.
            if (isNewUser) {
              firebase.db.collection("Bars").doc(user.uid).set({
                  name: 'bar name',
              });
            }
            // Do something with the returned AuthResult.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            // return true;
          },
          signInFailure: function(error) {
          },
          uiShown: function() {
          }
        },
        // credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
        // Query parameter name for mode.
        queryParameterForWidgetMode: 'mode',
        // Query parameter name for sign in success url.
        queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'orders',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // Whether the display name should be displayed in the Sign Up page.
            requireDisplayName: true
          },
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // Invisible reCAPTCHA with image challenge and bottom left badge.
            recaptchaParameters: {
              type: 'image',
              size: 'invisible',
              badge: 'bottomleft'
            }
          },
        ],
      };

   	return (
   		<div className='LoginWrapper'>
        <p>Zakazo</p>
   			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
   		</div>
   	)
}

export default Login;