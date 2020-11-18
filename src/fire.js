import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDXzqfaUZn4Kxt93mOCD6f-MDbXt3PCsQU",
  authDomain: "learning-react-3134c.firebaseapp.com",
  databaseURL: "https://learning-react-3134c.firebaseio.com",
  projectId: "learning-react-3134c",
  storageBucket: "learning-react-3134c.appspot.com",
  messagingSenderId: "669153604869",
  appId: "1:669153604869:web:e8ed92145f20be26ebb36c",
};
firebase.initializeApp(firebaseConfig);

export default firebase.firestore()