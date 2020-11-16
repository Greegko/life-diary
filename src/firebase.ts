import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCMMAW7t9ed_SUQ2dIqEbrN4AJWRKrILls",
  authDomain: "personal-development-185f9.firebaseapp.com",
  databaseURL: "https://personal-development-185f9.firebaseio.com",
  projectId: "personal-development-185f9",
  storageBucket: "personal-development-185f9.appspot.com",
  messagingSenderId: "682482388853",
  appId: "1:682482388853:web:e60d0a23731c3607448d3c"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
