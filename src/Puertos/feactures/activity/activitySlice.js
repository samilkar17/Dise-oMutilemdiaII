import { createSlice } from "@reduxjs/toolkit";
import firebase from "@firebase/app-compat";
import { auth, db } from "../../firebase/config";
import toast from "react-hot-toast";
import { necesaryPoints } from "../../../Adaptadores/utills/LevelUtils";

const initialState = {
  activity: [],
  userData: {},
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
    readActivitiesSuccess: (state, action) => {
      state.activity = action.payload.activity;
      state.userData = action.payload.userData;
    },
  },
});

export const {
  completeActivitySuccess,
  setActivitySucces,
  addActivitySuccess,
  removeActivitySuccess,
  resetActivitySuccess,
  readActivitiesSuccess,
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
          }).catch((e) => {
            reject(toast(`${e}`, { icon: "❌❌" }))
          })
      }
    });
  });
};
//lectura de actividades en el servidor con una fecha de ultima actualizacion y con actualización en realtime
export const readActivities = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection('users').doc(userAuth.uid).onSnapshot((doc) => {
          readActivitiesSuccess({ activity: doc.data().activities ?? [], userData: doc.data() });
        });
      }
    }
    )
  });
}

export const completeActivity = ({ name, docId }) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      //primero vemos que pueda añadir actividades y la añadimos
      let today = new Date();
      if (today.getDate() > this.userData.lastUpdate.getDate()) {
        //hubo cambio de dia por ende se inserta sin problema
        db.collection('user').doc(userAuth.uid).update({
          activities: [{ name: name, docId: docId }]
        });
      } else if (this.activity.length < 5 && !(docId == null && this.activity.filter(activity => activity.name == name).length < 2)) {
        //verificamos que no este añadido ya
        if (!this.activity.some((activity) => activity.name == name && docId == docId)) {
          db.collection('user').doc(userAuth.uid).update({
            activities: firebase.firestore.FieldValue.arrayUnion({ name: name, docId: docId })
          })
        }
      } else {
        reject();
        return;
      }

      //ahora verificamos el nivel actual
      let level = this.userData.level ?? 1;
      let points = this.userData.points ?? 0;
      points += 1;
      let necesaryPoints = necesaryPoints(level);
      if (points >= necesaryPoints) {
        level += 1;
        points = 0;
        db.collection('user').doc(userAuth.uid).update({
          activities: [({
            level: level,
            points: points
          })]
        });
      }
    });
  });
}