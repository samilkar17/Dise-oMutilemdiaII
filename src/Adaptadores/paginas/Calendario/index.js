import React, { useEffect, useState } from "react";
import Button from "../../componentes/Button";
import CalendarComponent from "../../componentes/CalendarComponent";
import Item from "../../componentes/Item";
import "./index.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Puertos/feactures/user/userSlice";
import { setActivitySucces } from "../../../Puertos/feactures/activity/activitySlice";
import { auth, db } from "../../../Puertos/firebase/config";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const categories = [
  {
    color: "#68F4EC",
    name: "Ciencias",
  },
  {
    color: "#5FD18C",
    name: "Ocio",
  },
  {
    color: "#FF8080",
    name: "Inglés",
  },
  {
    color: "#EF8BF8",
    name: "Matemáticas",
  },
  {
    color: "#A866F1",
    name: "Computactión",
  },
  {
    color: "#5665EC",
    name: "Meditación",
  },
];

export default function Calendario() {
  const history = useHistory();
  const [activities, setActivities] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    changeDate(new Date());
  }, []);
  const changeDate = (selectedDate) => {
    //aqui se llama el cambio de fecha
    const firstDate = new Date(selectedDate.getTime());
    firstDate.setDate(firstDate.getDate() - selectedDate.getDay());
    const endDate = new Date(firstDate.getTime());
    endDate.setDate(endDate.getDate() + 7);
    setCurrentDate(selectedDate);

    //llama back
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection("actividades")
          .where("user", "==", user.user)
          .where("tStart", ">=", firstDate)
          .onSnapshot((snapshot) => {
            console.log('authsddsds')
            let activities = snapshot.docs.map((doc) => ({
              ...doc.data(),
              DocumentId: doc.id,
            }));
            activities.forEach(activity => {
              activity.tStart = activity.tStart.toDate();
              activity.tFinal = activity.tFinal.toDate();
            });
          });
      }
    });
  };
  return (
    <div className="flex justify-center  bg-blue-400 w-screen h-screen mt-12 ">
      <div className="flex w-4/5 p-8">
        <Item>
          <ArrowLeftIcon
            className="w-12 h-12 cursor-pointer text-white rounded-full bg-red-500  p-1.5 hover:bg-red-700  transition ease-in duration-200"
            onClick={() => history.goBack()}
          />
        </Item>
        <Item right={12} top={2}>
          <h4 className="ml-auto font-body  text-white text-3xl">Calendario</h4>
        </Item>
      </div>
      <Item left={12} right={12} top={5} bottom={5}>
        <div className="relative p-8 calendarBackground">
          <img
            className="absolute bg-cover h-full w-full z-0 "
            src="/assets/backgrounds/bg-calendar.svg"

          />
          <div className="flex justify-center items-center z-10 mt-12">

            <div className="w-9/12 px-3 flex justify-center mb-2 z-10">
              <input
                type="date"
                onChange={(e) => {
                  changeDate(new Date(e.target.value))
                }}
                value={currentDate.toISOString().substr(0, 10)}
                style={{ borderRadius: 10, padding: "0.2em 0.5em" }}
              />
            </div>
          </div>
          <div className="flex mx-auto  w-4/5 z-10">
            <div className="w-3/12 px-16 z-10 ">
              <div className="card" style={{ marginTop: "2em" }}>
                <div className="text-center w-full font-bold">
                  Categorias/
                  <br />
                  Asignaturas
                </div>
                <div className="features z-10">
                  {categories.map((category, index) => (
                    <div style={{ color: category.color }} key={index}>
                      <span style={{ color: "black" }}>{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="z-10 w-full flex flex-col mt-3 text-white items-center">
                <span className="text-center font-bold text-lg">
                  Actividades cumplidas
                </span>
                <img src="/assets/icons/star-2.svg" className="my-3" />
                <span className="text-center mb-6 font-bold text-3xl">15</span>
                <div className="w-full flex justify-center items-center">
                  <Link to="/planificador">
                    <Button text="Agenda" variant="secondary" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="z-10 w-9/12 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full px-2 h-4/5"
              style={{ maxHeight: "34vw" }}
            >
              <CalendarComponent events={activities} currentDate={currentDate} />
            </div>
          </div>
        </div>
      </Item>
    </div>
  );
}
