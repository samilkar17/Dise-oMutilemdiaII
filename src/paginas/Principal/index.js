import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import { logoutSuccess, selectUser } from "../../feactures/user/userSlice";
import { useDispatch } from "react-redux";
import { auth, db, server } from "../../firebase/config";
import { useSelector } from "react-redux";
import Perro from "../../componentes/Perro";
import Boton from "../../componentes/Button";

import { resetActivitySuccess } from "../../feactures/activity/activitySlice";

export default function Principal() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  useEffect(() => {
    fetchUser();
  });
  const fetchUser = async () => {
    try {
      const query = await db
        .collection("user")
        .where("uid", "==", user.user)
        .get();
      const data = await query.docs[0].data();
      setName(data.displayName);
      setLastName(data.lastName);
    } catch (error) {
      alert(error);
    }
  };
  const handleSignOut = () => {
    dispatch(logoutSuccess());
    dispatch(resetActivitySuccess());
    auth.signOut();
  };
  // const handleGender = (e) => {
  //   e.preventDefault();
  //   dispatch(Gender({ user, gender }));
  //   history.push("/planificador");
  // };

  return (
    <div className="bg-blue-400 w-screen h-screen">
      <div className="flex justify-end items-center self-start p-6 space-x-4 ">
        <h1 className="text-white text-2xl font-body capitalize">
          Bienvenido{" "}
          <strong className="text-yellow-300">
            {name} {lastName}
          </strong>
        </h1>
        <XIcon
          onClick={handleSignOut}
          className="text-white w-16 h-16 cursor-pointer hover:bg-red-400 rounded-full transition duration-150 ease-in-out"
        />
      </div>
      <form>
        <div className="flex justify-center space-x-8">
          <label>
            <input
              className="absolute opacity-0"
              type="radio"
              value="hombre"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "hombre"}
            />
            <img
              className="w-4/5 cursor-pointer transform transition duration-500 hover:scale-95 hover:filter brightness-200"
              src="/assets/Male.png"
              alt=""
            />
          </label>
          <label>
            <input
              className="absolute opacity-0"
              type="radio"
              value="mujer"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "mujer"}
            />
            <img
              className="w-4/5 cursor-pointer transform transition duration-500 hover:scale-95 hover:filter brightness-200"
              src="/assets/fMale.png"
              alt=""
            />
          </label>
        </div>
        <div className="flex items-center m-6">
          <Perro titulo="Personaliza tu proyección virtual para empezar con la experiencia." />
          <div className="ml-auto p-6 w-44">
            <Link to="/planificador">
              <Boton titulo="Listo" color="btn-y" />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
