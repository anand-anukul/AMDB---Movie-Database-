// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSdIkfxw8fTx2GGiXuXlrL09zZOjzPpzQ",
  authDomain: "amdb-cff05.firebaseapp.com",
  projectId: "amdb-cff05",
  storageBucket: "amdb-cff05.appspot.com",
  messagingSenderId: "836603729374",
  appId: "1:836603729374:web:5192548e0763860392b94f",
  measurementId: "G-PZDLC67YTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);