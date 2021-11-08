import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Perro from "../../componentes/Perro";

export default function Consejos() {
  return (
    <div className=" flex flex-col  bg-blue-400 w-screen h-screen">
      <div className=" flex w-4/5 px-6 mt-12 mx-auto">
        <Link to="/menu">
          <ArrowLeftIcon className="w-12 h-12 cursor-pointer text-white rounded-full bg-red-500  p-1.5 hover:bg-red-700  transition ease-in duration-200" />
        </Link>
        <h1 className="ml-auto font-body  text-white text-3xl">Consejos</h1>
      </div>
      <div className="w-auto h-auto mx-auto ">
        <img src="assets/backgrounds/consejos.png" alt="" />
      </div>
      <div className="relative flex justify-end -top-60 pr-60">
        <Perro />
      </div>
    </div>
  );
}
