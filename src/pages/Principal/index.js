import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import { auth, db, logOut } from "../../firebase/utils";
import Perro from "../../Components/Perro";
import Avatar from "../../Components/Avatar";
import Boton from '../../Components/Button'

export default function Principal() {
  const [user, loading] = useAuthState(auth);
  const [nombre, setNombre] = useState("");
  const [apellido,setApellido]= useState('')
  const history = useHistory();

  const fetchUser = async () => {
    try {
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();
      const data = await query.docs[0].data();
      setNombre(data.nombre);
      setApellido(data.apellido)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUser();
  }, [user, loading]);
  return (
    <div className="bg-blue-400 w-screen h-screen">
      <div className="flex justify-end items-center self-start p-6 space-x-4 ">
        <h1 className="text-white text-2xl font-body capitalize">
          Bienvenido  <strong className="text-yellow-300"> {nombre} {apellido}</strong>
        </h1>
        <XIcon
          onClick={logOut}
          className="text-white w-16 h-16 cursor-pointer hover:bg-red-400 rounded-full transition duration-150 ease-in-out"
        />
      </div>
      <div className="flex justify-center space-x-8">
        <Avatar/>
      </div>
      <div className="flex items-center m-6">
        <Perro />
        <div className="ml-auto p-6 w-44">
          <Boton titulo="Listo"/>
        </div>
      </div>
    </div>
  );
}
