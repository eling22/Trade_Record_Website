import React from 'react';
import firebase from 'firebase/app';
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

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
var db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

class BtnLog extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.is_log_in = false
    }
    handleClick() {
        if (this.is_log_in) this.logOut()
        else this.logIn()
        this.setState({ state: this.state });
    }
    logOut(){
        console.log("click logout")
        firebase.auth().signOut().then(function() {
            alert('您被逐出了');
            var user = firebase.auth().currentUser;
            console.log("",user)
        }); 
        this.is_log_in = !this.is_log_in
    }
    logIn(){
        console.log("click login")
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
            var token = result.credential.accessToken;
            var user = result.user;
            alert('您登入了');
            console.log(token,user)
            db.collection("trade_data").get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  console.log(`${doc.id} => ${doc.data()}`);
                  console.log(doc.data());
              });
            });
        });  
        this.is_log_in = !this.is_log_in
    }
    render() {
        let str = ""
        if(this.is_log_in) str = "登出";
        else str = "google 登入";

        return (
            <button className="btn btn-outline-light" type="button" id = "btnLogOut" onClick={this.handleClick}>{str}</button>
        );
    }
}

export default function NavBar(){
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Eling's Web</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                <a className="nav-link" href="/about">About</a>
                <a className="nav-link" href="/users">Users</a>
              </div>
            </div>
            <form className="d-flex">
              <BtnLog></BtnLog>
            </form>
          </div>
        </nav>
    );
}

