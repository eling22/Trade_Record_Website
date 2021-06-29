// import firebase from 'firebase/app';
// import "firebase/analytics";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyCF2-45Hjl6RaNkf2F1qlx-Spn1g5gfbQA",
//     authDomain: "stock-collect.firebaseapp.com",
//     projectId: "stock-collect",
//     storageBucket: "stock-collect.appspot.com",
//     messagingSenderId: "343528860961",
//     appId: "1:343528860961:web:9121afd0b53d2484e96260",
//     measurementId: "G-WX26NF9R7E"
//   };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// var db = firebase.firestore();

// db.collection("trade_data").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//       console.log(doc.data());
//   });
// });