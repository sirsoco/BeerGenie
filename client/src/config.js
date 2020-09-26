import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCxsddApO88FBnQF_mDeLCp3GXsLmKPS0A",
  authDomain: "beergenie-fa31e.firebaseapp.com",
  databaseURL: "https://beergenie-fa31e.firebaseio.com",
  projectId: "beergenie-fa31e",
  storageBucket: "beergenie-fa31e.appspot.com",
  messagingSenderId: "914180703894",
  appId: "1:914180703894:web:882931aab0246a349364b7",
  measurementId: "G-EB3BW86XRQ"
};
firebase.initializeApp(firebaseConfig);

export default firebaseConfig;
