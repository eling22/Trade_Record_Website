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

export default class Database {
    constructor(props) {
        this.is_log_in = false
    }
    async logOut(){
        console.log("click logout")
        await firebase.auth().signOut();
        alert('您被逐出了');
        var user = firebase.auth().currentUser;
        console.log("",user)
        this.is_log_in = !this.is_log_in
    }
    async logIn(){
        console.log("click login")
        let result = await firebase.auth().signInWithPopup(provider);
        // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
        var token = result.credential.accessToken;
        var user = result.user;
        alert('您登入了');
        console.log(token,user)
        this.is_log_in = !this.is_log_in
    }
    getData(){
        console.log("get data")
        db.collection("eileen_trade_data").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                console.log(doc.data());
            });
          });
    }
}