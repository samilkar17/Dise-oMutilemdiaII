import { createSlice } from "@reduxjs/toolkit";
import firebase from "@firebase/app-compat";
import { auth, db } from "../../firebase/config";
import toast from "react-hot-toast";

const initialState = {
  activity: [],
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addActivitySuccess: (state, action) => {
      state.activity = action.payload;
    },
    removeActivitySuccess: (state, action) => {
      state.activity = action.payload;
    },
    setActivitySucces: (state, action) => {
      state.activity = action.payload;
    },
    completeActivitySuccess: (state, action) => {
      state.activity = action.payload;
    },
    resetActivitySuccess: (state) => {
      state.activity = [];
    },
  },
});

export const {
  completeActivitySuccess,
  setActivitySucces,
  addActivitySuccess,
  removeActivitySuccess,
  resetActivitySuccess,
} = activitySlice.actions;

export const selectActivity = (state) => state.activity.activity;

export default activitySlice.reducer;

export const addActivity = ({
  user,
  activity,
  tStart,
  tFinal,
  category,
  color,
}) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const collection = db.collection(`actividades de ${user.user}`);
        collection.get().then((snapshot) => {
          const exist = snapshot.docs.find((doc) => {
            if (
              doc.data().activity == activity &&
              doc.data().category == category
            ) {
              return true;
            }
            return false;
          });
          if (!exist) {
            collection
              .add({
                activity: activity,
                tStart: tStart,
                tFinal: tFinal,
                category: category,
                color: color,
                completed: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                resolve(toast("Nueva actividad programada", { icon: "👍🏾👍🏾" }));
              })
              .catch((e) => {
                reject(toast(`${e}`, { icon: "❌❌" }));
              });
          }
        });
      }
    });
  });
};

export const deleteActivity = ({ user, doc }) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection(`actividades de ${user.user}`)
          .doc(doc)
          .delete()
          .then(() => {
            resolve(toast("Actividad eliminada", { icon: "❌❌" }));
          })
          .catch((e) => {
            reject(toast(`${e}`, { icon: "❌❌" }));
          });
      }
    });
  });
};

export const completedActivity = ({ user, doc, completed }) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection(`actividades de ${user.user}`)
          .doc(doc)
          .update({
            completed: !completed,
          })
          .then(() => {
            if (completed) {
              toast("Actividad sin completar", { icon: "❓❓" });
            } else {
              toast("Actividad completada", { icon: "✔✔" });
            }
            resolve()
          }).catch((e)=>{
            reject(toast(`${e}`, { icon: "❌❌" }))
          })
      }
    });
  });
};
