//importd
import React, {useState, useEffect} from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'

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

export default function Auth() {// The component's Local state.
const [isSignedIn, setState] = useState({
  isSignedIn: false // Local signed-in state.
});

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};

useEffect(() => {
  // Listen to the Firebase Auth state and set the local state.
  const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
    (user) => setState({isSignedIn: !!user}))

   // Make sure we un-register Firebase observers when the component unmounts 
  return () => { unregisterAuthObserver()
  }
}, [])

return (
  <div>
    <h1>My App</h1>
    <p>Please sign-in:</p>
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
  </div>
);
}

