// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCETXNo8rPw90RUyvF-l_aoVjEz7XWs_NM",

  authDomain: "p87-62301.firebaseapp.com",

  projectId: "p87-62301",

  storageBucket: "p87-62301.firebasestorage.app",

  messagingSenderId: "487316636651",

  appId: "1:487316636651:web:1cbcc495cb2fd309f14fae",

  measurementId: "G-E8TMVHE87T"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const db = getFirestore(app);