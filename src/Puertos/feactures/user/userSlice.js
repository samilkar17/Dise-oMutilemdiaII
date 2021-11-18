import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase/config";
const initialState = {
  user: null,
  checked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.checked = true;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.checked = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.checked = false;
    },
    checkUserSuccess: (state, action) => {
      state.user = action.payload;
      state.checked = true;
    },
    updateUserDataSuccess: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    }
  },
});

export const { loginSuccess, logoutSuccess, registerSuccess, updateUserDataSuccess } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectChecked = (state) => state.checked;

export default userSlice.reducer;

export const Register =
  ({ name, lastName, email, password }) =>
    (dispatch) => {
      return new Promise((resolve, reject) => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userAuth) => {
            alert(userAuth.user.uid);
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
                  gender: null,
                  activities: [],
                  points: 0,
                  level: 1
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
            db.collection("user").doc(userAuth.user.uid).get().then((doc) => {
              if (userAuth.user.emailVerified) {
                dispatch(
                  loginSuccess({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    data: doc.data(),
                    displayName: userAuth.user.displayName,
                  })
                );
                resolve();
              }
            })
          })
          .catch((error) => {
            console.log(error);
            reject(
              toast(`correo electrónico o contraseña invalidos`, { icon: "❌❌" })
            );
          });
      });
    };

export const checkUser = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection("user").doc(userAuth.user.uid).get().then((doc) => {
          if (userAuth.user.emailVerified) {
            dispatch(
              loginSuccess({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                data: doc.data(),
                displayName: userAuth.user.displayName,
              })
            );
            resolve();
          }
        })
      }
    });
  });
};


export const updateUserData =
  ( data) =>
    (dispatch) => {
      auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          return new Promise((resolve, reject) => {
            db.collection("user").doc(userAuth.uid).update(data).then(() => {
              dispatch(
                updateUserData(
                  data
                )
              );
              resolve();
            })
          });
        }
      });
    };
