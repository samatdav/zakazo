import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDsThETmDxn9gHWGaJ4ui5AacvUsKpD2pU",
    authDomain: "zakazocom.firebaseapp.com",
    databaseURL: "https://zakazocom.firebaseio.com",
    projectId: "zakazocom",
    storageBucket: "zakazocom.appspot.com",
    messagingSenderId: "458350876770"
};

firebase.initializeApp(config);

firebase.db = firebase.firestore();

export default firebase;