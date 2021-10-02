import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBjruf1Ha8m3pVtK2q1IWzy9p8G1UKwoJU",
  authDomain: "dmultimedia-2.firebaseapp.com",
  projectId: "dmultimedia-2",
  storageBucket: "dmultimedia-2.appspot.com",
  messagingSenderId: "165002652449",
  appId: "1:165002652449:web:eb72139aca6a0ead97ec60",
  measurementId: "G-GRB05KDYQC",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
