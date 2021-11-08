import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Puertos/feactures/user/userSlice";
import { size, map } from "lodash";
import Actividad from "../Actividad";
import FlipMove from "react-flip-move";
import { useDispatch } from "react-redux";
import {
  resetActivitySuccess,
  setActivitySucces,
} from "../../../Puertos/feactures/activity/activitySlice";
import { auth, db } from "../../../Puertos/firebase/config";

export default function ActividadAgendada() {
  const [activities, setActivities] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection(`actividades de ${user.user}`)
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            dispatch(
              setActivitySucces(
                setActivities(
                  snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    DocumentId: doc.id,
                  }))
                )
              )
            );
          });
      }
    });
    return () => {
      dispatch(resetActivitySuccess());
    };
  }, [dispatch, user]);

  return (
    <>
      <h1 className="  text-blue-800 font-body text-xl text-center mb-8">
        Actividades Programadas
      </h1>
      <div className="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full px-2 h-4/5">
        <FlipMove>
          {!activities ? (
            <p className="font-body text-center text-xl text-blue-600">
              Cargando...
            </p>
          ) : size(activities) === 0 ? (
            <h3 className="font-body text-center text-xl text-blue-600">
              No hay actividades programadas!
            </h3>
          ) : (
            map(
              activities,
              ({
                DocumentId,
                activity,
                category,
                color,
                tFinal,
                tStart,
                completed,
                timestamp
              }) => (
                <Actividad
                  key={DocumentId}
                  doc={DocumentId}
                  title={activity}
                  category={category}
                  color={color}
                  tFinal={tFinal}
                  tStart={tStart}
                  completed={completed}
                  date={timestamp}
                />
              )
            )
          )}
        </FlipMove>
      </div>
    </>
  );
}
