import { createSlice } from "@reduxjs/toolkit";

import { auth, db } from "../../firebase/config";
const initialState = {
  user: null,
  group: "",
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
    isGroup: (state, action) => {
      state.group = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, registerSuccess, isGroup } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

export const Register =
  ({ name, lastName, email, password }) =>
  async (dispatch) => {
    try {
      auth.createUserWithEmailAndPassword(email, password).then((userAuth) => {
        db.collection("user")
          .doc(userAuth.user.uid)
          .set({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: name,
            lastName,
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
          });
      });
    } catch (error) {
      alert(error);
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
        if (userAuth.user.emailVerified) {
          dispatch(
            loginSuccess({
              email: userAuth.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
            })
          );
        }
      });
    } catch (error) {
      alert(error);
    }
  };
