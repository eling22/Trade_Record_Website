// import { svg } from 'd3';
// import {circle} from 'd3';
import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/firestore";
// import "firebase/firestore";
// import admin from "firebase-admin";
// import serviceAccount from "stock-collect-firebase-adminsdk.json";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// const d3 = require("d3");

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const firebaseConfig = {
  apiKey: "AIzaSyCF2-45Hjl6RaNkf2F1qlx-Spn1g5gfbQA",
  authDomain: "stock-collect.firebaseapp.com",
  projectId: "stock-collect",
  storageBucket: "stock-collect.appspot.com",
  messagingSenderId: "343528860961",
  appId: "1:343528860961:web:9121afd0b53d2484e96260",
  measurementId: "G-WX26NF9R7E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var db = firebase.firestore();

db.collection("trade_data").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(doc.data());
  });
});

// var firebaseui = require('firebaseui');
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     firebase.auth.GithubAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });


// var uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   signInSuccessUrl: '<url-to-redirect-to-on-success>',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   ],
//   // Terms of service url.
//   tosUrl: '<your-tos-url>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>'
// };

// ui.start('#firebaseui-auth-container', uiConfig);

var provider = new firebase.auth.GoogleAuthProvider();
var btnGooglePopup = document.getElementById('googleSingUpPopup');

btnGooglePopup.onclick = function() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
    var token = result.credential.accessToken;
    var user = result.user;
    alert('您登入了');
    console.log(token,user)
  });  
}
// var user = firebase.auth().currentUser;
// console.log(user)

var btnLogOut = document.getElementById('btnLogOut');
btnLogOut.onclick = function() {
  firebase.auth().signOut().then(function() {
    alert('您被逐出了');
    var user = firebase.auth().currentUser;
    console.log("",user)
  })
}

const FaceCircle = (props) => (
  <circle r={props.r} fill={props.color}/>
);

function Home() {
  return(
    <div className="App">
      <header className="App-header">
        <svg width="960" height="500">
          <FaceCircle r = "245" color = "yellow"/>
          <FaceCircle r = "100" color = "blue"/>
        </svg>
        <p>
          Hello World!
        </p>
      </header>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  return (
    <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
