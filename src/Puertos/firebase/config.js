import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyADDypFZHr1UlUUjgZPp80pTO-iiOKgzrM",
  authDomain: "testdiseno-a212f.firebaseapp.com",
  projectId: "testdiseno-a212f",
  storageBucket: "testdiseno-a212f.appspot.com",
  messagingSenderId: "772875483286",
  appId: "1:772875483286:web:e06f482f84d922b85c6ab7",
  measurementId: "G-5E6P42RFKH"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
