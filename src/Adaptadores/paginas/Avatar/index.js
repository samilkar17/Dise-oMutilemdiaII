import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import {
  logoutSuccess,
  selectUser,
} from "../../../Puertos/feactures/user/userSlice";
import { useDispatch } from "react-redux";
import { auth, db } from "../../../Puertos/firebase/config";
import { useSelector } from "react-redux";
import { resetActivitySuccess } from "../../../Puertos/feactures/activity/activitySlice";
import { setGender } from "../../../Puertos/feactures/gender/genderSlices";
import toast, { Toaster } from "react-hot-toast";
import Perro from "../../componentes/Perro";
import Button from "../../componentes/Button";
export default function Avatar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const [genero, setGenero] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (genero == "hombre") {
      setMessage("Ha seleccionado a un hombre 👦🏾");
    } else if (genero == "mujer") {
      setMessage("Ha seleccionado una mujer 👩🏻");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (genero) {
      history.push("/historia");
    } else {
      toast("Por favor selecciona un avatar", { icon: "😉😉" });
    }
  };
  const handleSignOut = () => {
    dispatch(logoutSuccess());
    dispatch(resetActivitySuccess());
    auth.signOut();
  };

  return (
    <div className="bg-blue-400 w-screen h-screen">
      <div className="flex justify-end items-center self-start p-6 space-x-4 my-12">
        <h1 className="text-white text-2xl font-body capitalize">
          Bienvenido{" "}
          <strong className="text-yellow-300">{user.displayName}</strong>
        </h1>
        <XIcon
          onClick={handleSignOut}
          className="text-white w-16 h-16 cursor-pointer hover:bg-red-400 rounded-full transition duration-150 ease-in-out"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center m-6">
          {genero ? (
            <h1 className="text-white text-2xl font-body ">{message}</h1>
          ) : (
            <h1 className="text-white text-2xl font-body ">
              Selecciona un personaje 😊
            </h1>
          )}
        </div>
        <div className="flex flex-col  justify-center items-center space-x-8">
          <div className="flex justify-center space-x-8">
            <label>
              <input
                className="absolute opacity-0"
                type="radio"
                value="hombre"
                onChange={(e) => setGenero(e.target.value)}
                checked={genero === "hombre"}
              />
              <img
                className="w-4/5 cursor-pointer transform transition duration-500 hover:scale-95 hover:filter brightness-200"
                src="/assets/characteres/hombre.svg"
                alt=""
              />
            </label>
            <label>
              <input
                className="absolute opacity-0"
                type="radio"
                value="mujer"
                onChange={(e) => setGenero(e.target.value)}
                checked={genero === "mujer"}
              />
              <img
                className="w-4/5 cursor-pointer transform transition duration-500 hover:scale-95 hover:filter brightness-200"
                src="/assets/characteres/mujer.svg"
                alt=""
              />
            </label>
          </div>
        </div>
        <div className="flex items-center m-6">
          <Perro
            text="Personaliza tu proyección virtual para empezar con la experiencia."
            inverse={true}
            arrow="bottom"
          />
          <div className="ml-auto p-6 w-44">
            <Toaster
              containerStyle={{
                position: "absolute",
                top: "70px",
                left: "25px",
              }}
              toastOptions={{
                className:
                  "whitespace-nowrap font-body shadow-2xl border-2 border-blue-200 rounded-2xl text-blue-800 p-12",
                style: {
                  background: "#018DCB",
                  color: "white",
                },
              }}
            />
            <Button bottom="5" right="5" text="Listo" color="btn-y" onClick={()=>{dispatch(setGender(genero)); history.push('/historia')}} />
          </div>
        </div>
      </form>
    </div>
  );
}