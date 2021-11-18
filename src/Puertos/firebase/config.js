import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyCWKJHzE8DOFVh7Lt_jRjqrEhN0zKe1Wec",
  authDomain: "testd-ae8ca.firebaseapp.com",
  projectId: "testd-ae8ca",
  storageBucket: "testd-ae8ca.appspot.com",
  messagingSenderId: "796942760527",
  appId: "1:796942760527:web:d49d04ab98b338380cc83a",
  measurementId: "G-7VEZSCP78M"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
