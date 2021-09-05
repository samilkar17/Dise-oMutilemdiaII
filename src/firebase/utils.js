import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export const signIn = async (email,password)=>{
  try {
    await auth.signInWithEmailAndPassword(email,password)
  } catch (error) {
    console.log(error)
  }
}

export const signUp = async (nombre,apellido,email,password)=>{
  try {
    const res = await auth.createUserWithEmailAndPassword(email,password)
    const user = res.user
    await db.collection('users').add({
      uid:user.uid,
      nombre,
      apellido,
      email
    })
  } catch (error) {
    console.log(error)
  }
}
export const logOut = ()=>{
  auth.signOut()
}
