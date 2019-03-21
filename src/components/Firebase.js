import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyBObUvnQvFnbpqRGS6Hi6bfdzv_EqlkS6c",
	authDomain: "zakazo-840f1.firebaseapp.com",
	databaseURL: "https://zakazo-840f1.firebaseio.com",
	projectId: "zakazo-840f1",
	storageBucket: "zakazo-840f1.appspot.com",
	messagingSenderId: "651753499509"
};
  
firebase.initializeApp(config);

firebase.db = firebase.firestore();

export default firebase;