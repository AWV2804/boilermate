// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCWCmdRqhjI6LcZdwNtQEKbBqgbl18eqU",
  authDomain: "boilermate-b3fcd.firebaseapp.com",
  databaseURL: "https://boilermate-b3fcd-default-rtdb.firebaseio.com",
  projectId: "boilermate-b3fcd",
  storageBucket: "boilermate-b3fcd.appspot.com",
  messagingSenderId: "580822461058",
  appId: "1:580822461058:web:25ffa8f1fcfb1ae3ae629b",
  measurementId: "G-VYYFXKTBWG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };