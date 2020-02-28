
// Add the Firebase services that you want to use
import firebase from "firebase";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyAP3hIlW99rVW9no1R-5F6xSxUJbv25vLg",
    authDomain: "reactnative-7a760.firebaseapp.com",
    databaseURL: "https://reactnative-7a760.firebaseio.com",
    projectId: "reactnative-7a760",
    storageBucket: "reactnative-7a760.appspot.com",
    messagingSenderId: "30401137180",
    appId: "1:30401137180:web:62ace4d40567f8541e2dd9",
    measurementId: "G-TQD9NFCZ2N"
  };
//  var database = firebase.database();

export default () => firebase.initializeApp(firebaseConfig);