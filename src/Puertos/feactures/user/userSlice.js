import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase/config";
const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
  },
});

export const { loginSuccess, logoutSuccess, registerSuccess } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

export const Register =
  ({ name, lastName, email, password }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
          userAuth.user
            .updateProfile({
              displayName: name,
              lastName: lastName,
            })
            .then(() => {
              db.collection("user").doc(userAuth.user.uid).set({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                lastName,
              });
            })
            .then(() => {
              dispatch(
                registerSuccess({
                  email: userAuth.user.email,
                  uid: userAuth.user.uid,
                  displayName: name,
                  lastName,
                })
              );
              resolve();
            });
        })
        .catch((error) => {
          console.log(error);
          reject(toast("El correo electrónico ya existe", { icon: "❌❌" }));
        });
    });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userAuth) => {
          if (userAuth.user.emailVerified) {
            dispatch(
              loginSuccess({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
              })
            );
            resolve();
          }
        })
        .catch((error) => {
          console.log(error);
          reject(
            toast(`correo electrónico o contraseña invalidos`, { icon: "❌❌" })
          );
        });
    });
  };
