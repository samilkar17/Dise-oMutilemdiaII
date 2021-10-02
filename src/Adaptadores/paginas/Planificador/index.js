import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import ActividadAgendada from "../../componentes/Actividad_agendada";
import InfoUsuario from "../../componentes/Info_usuario";
import PlanificadorActividad from "../../componentes/Planificador_actividad";

export default function Planificador() {
  return (
    <>
      <div className="relative flex justify-center  bg-blue-400 w-screen h-screen mt-12 ">
        <div className="absolute flex  w-4/5 p-8">
          <Link to="/menu">
            <ArrowLeftIcon className="w-12 h-12 cursor-pointer text-white rounded-full bg-red-500  p-1.5 hover:bg-red-700  transition ease-in duration-200" />
          </Link>
          <h1 className=" ml-auto font-body  text-white text-3xl">Agenda</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className=" absolute flex h-4/5 w-5/6 ">
            <img
              className="absolute bg-cover h-full w-full z-0"
              src="/assets/backgrounds/bg-calendar.svg"
              alt=""
            />
            <div className=" z-10 flex-1 my-16">
              <PlanificadorActividad />
            </div>
            <div className=" z-10 flex-1 my-16 ">
              <ActividadAgendada />
            </div>
            <div className=" z-10 flex-1 flex justify-center my-16 ">
              <InfoUsuario />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
