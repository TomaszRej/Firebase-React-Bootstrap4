import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDxgitc8yd9XlsAmaaE-TK5kqkiSHcRhUE",
  authDomain: "myfirstproject-60f1f.firebaseapp.com",
  databaseURL: "https://myfirstproject-60f1f.firebaseio.com",
  projectId: "myfirstproject-60f1f",
  storageBucket: "myfirstproject-60f1f.appspot.com",
  messagingSenderId: "708256386610"
};

const fire = firebase.initializeApp(config);
export default fire;
