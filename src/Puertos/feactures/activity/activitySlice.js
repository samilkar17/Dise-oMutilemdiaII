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
      console.log('activitycompletedpayload', action.payload)
      state.activity = action.payload.activity;
      state.userData = action.payload.userData;
    },
    resetActivitySuccess: (state, action) => {
      state.activity = action.payload;
    },
    readActivitiesSuccess: (state, action) => {
      state.activity = action.payload.activity;
      state.userData = action.payload.userData;
    },
    completeActivitySuccess: (state, action) => {
      state.activity = action.payload.activity;
      state.userData = action.payload.userData;
    }
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
export const selectUserData = (state) => state.activity.userData;

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
        db.collection("actividades")
          .doc()
          .set({
            activity: activity,
            tStart: tStart,
            tFinal: tFinal,
            category: category,
            color: color,
            completed: false,
            user: auth.currentUser.uid,
          })
          .then(() => {
            console.log("Document successfully written!");
            resolve(toast("Nueva actividad programada", { icon: "👍🏾👍🏾" }));
          })
          .catch((e) => {
            reject(toast(`${e}`, { icon: "❌❌" }));
          });
      }
    });
  });
};

export const deleteActivity = ({ user, doc }) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection("actividades")
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

export const completedActivity = ({ user, doc, completed }) => (dispatch, getState) =>{
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection("actividades")
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
            dispatch(completeActivity('activity', doc));
            resolve()
          }).catch((e) => {
            reject(toast(`${e}`, { icon: "❌❌" }))
          })
          .catch((e) => {
            reject(toast(`${e}`, { icon: "❌❌" }));
          });
      }
    });
  });
};
//lectura de actividades en el servidor con una fecha de ultima actualizacion y con actualización en realtime
export const readActivities = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection('user').doc(userAuth.uid).onSnapshot((doc) => {
          console.log('lasss')
          let use = doc.data();
          use.lastUpdate = use.lastUpdate ? use.lastUpdate.toDate() : null;
          dispatch(readActivitiesSuccess({ activity: doc.data().activities ?? [], userData: use }));
        });
      }
    }
    )
  });
}

export const completeActivity = (name, docId) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      console.log('getStateActivity',getState().activity)
      let activitiesCopy = [...getState().activity.activity];
      //primero vemos que pueda añadir actividades y la añadimos
      let today = new Date();
      if (getState().activity.userData.lastUpdate == null || today.getDate() > getState().activity.userData.lastUpdate) {
        //hubo cambio de dia por ende se inserta sin problema
        db.collection('user').doc(userAuth.uid).update({
          activities: [],
          lastUpdate: firebase.firestore.Timestamp.fromDate(today)
        }).then(() => {console.log('updated')});
        activitiesCopy = [`${name}_${docId}`];
        db.collection('user').doc(userAuth.uid).update({
          activities: firebase.firestore.FieldValue.arrayUnion(`${name}_${docId}`),
        }).then(() => {console.log('updatedb')});
      } else if (getState().activity.activity.length < 5 && !getState().activity.activity.some(activity => activity == `${name}_${docId}`)) {
        //verificamos que no este añadido ya
        activitiesCopy = activitiesCopy.push(`${name}_${docId}`);
        db.collection('user').doc(userAuth.uid).update({
          activities: firebase.firestore.FieldValue.arrayUnion(`${name}_${docId}`),
          lastUpdate: firebase.firestore.Timestamp.fromDate(today)
        }).then(() => {console.log('updatedds')});
      } else {
        return;
      }

      //ahora verificamos el nivel actual
      let level = getState().activity.userData.level ?? 1;
      let points = getState().activity.userData.points ?? 0;
      console.log('prevpponi', points)
      points = points + 1;
      console.log(points);
      let necesaryPointsToUp = necesaryPoints(level);
      if (points >= necesaryPointsToUp) {
        level = level + 1;
        points = 0;
      }
      db.collection('user').doc(userAuth.uid).update({
        level: level,
        points: points
      });

      db.collection('user').doc(userAuth.uid).get().then((docCop) => {
        console.log('activity slince routes');
        let use = docCop.data();
        use.lastUpdate = use.lastUpdate ? use.lastUpdate.toDate() : null;
        dispatch(completeActivitySuccess({ activity: use.activities ?? [], userData: use }));
      }).then(() => {console.log('updssssated')});

    });
    resolve();
  });
}