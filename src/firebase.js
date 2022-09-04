// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh2TefkiCpBizHy_XiqzUXyrT9UDy_XHg",
    authDomain: "reels-c29b2.firebaseapp.com",
    projectId: "reels-c29b2",
    storageBucket: "reels-c29b2.appspot.com",
    messagingSenderId: "530921662951",
    appId: "1:530921662951:web:56b22694012775bc35f542"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();

const firestore=firebase.firestore();
export const storage=firebase.storage();
export const database={
    users:firestore.collection('users'),
    posts:firestore.collection('posts'),
    comments:firestore.collection('comments'),
    getTimeStamp:firebase.firestore.FieldValue.serverTimestamp,
}














// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/storage';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyBh2TefkiCpBizHy_XiqzUXyrT9UDy_XHg",
//     authDomain: "reels-c29b2.firebaseapp.com",
//     projectId: "reels-c29b2",
//     storageBucket: "reels-c29b2.appspot.com",
//     messagingSenderId: "530921662951",
//     appId: "1:530921662951:web:56b22694012775bc35f542"
//   };
  
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   export const auth=firebase.auth();
//   const firestore=firebase.firestore();
//   export const storage=firebase.storage();
//   export const database={
//     users:firestore.collection('users'),
//     getTimeStamp:firebase.firestore.FieldValue.getTimeStamp
// }