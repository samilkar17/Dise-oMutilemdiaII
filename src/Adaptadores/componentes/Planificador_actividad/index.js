import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Puertos/feactures/user/userSlice";
import { useDispatch } from "react-redux";
import {
  addActivity,
  addActivitySuccess,
} from "../../../Puertos/feactures/activity/activitySlice";
import { Toaster } from "react-hot-toast";
import Input from "../Input";
import Select from "react-select";
import Button from "../Button";

export default function PlanificadorActividad() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [activity, setActivity] = useState("");
  const [tStart, setTStart] = useState("");
  const [tFinal, setTfinal] = useState("");
  const [category, setCategory] = useState(null);
  const [color, setColor] = useState("");

  let colors = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];
  const options = [
    { value: "matematicas", label: "Matemáticas" },
    { value: "biologia", label: "Biología" },
    { value: "ocio", label: "Ocio" },
    { value: "inglés", label: "Inglés" },
    { value: "computación", label: "Computación" },
    { value: "meditación", label: "Meditación" },
   
  ];
  const selectCategory = (category) => {
    setCategory(category.label);
  };

  const resetForm = () => {
    setActivity("");
    setTStart("");
    setTfinal("");
    setCategory(null);
    setColor("");
  };
  const submitActivity = (e) => {
    e.preventDefault();

    dispatch(
      addActivitySuccess(
        addActivity({
          user,
          activity,
          tStart,
          tFinal,
          category,
          color,
        })
      )
    );
    resetForm();
  };

  return (
    <div className="flex-col justify-center items-center w-1/2 mx-auto space-y-8">
      <h1 className="text-blue-800 font-body text-xl text-center">
        Programa tus actividades
      </h1>
      <form className="space-y-6" onSubmit={submitActivity}>
        <div className="flex flex-col space-y-2">
          <label className="block font-body text-blue-800 text-sm">
            Nueva Actividad
          </label>
          <Input
            required
            placeholder="Titulo"
            type="text"
            name="activity"
            value={activity}
            handleChange={(e) => setActivity(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 ">
          <div className="flex-col w-2/5">
            <label className="block font-body text-blue-800 text-sm">Inicio</label>
            <Input
              required
              type="time"
              name="tStart"
              value={tStart}
              handleChange={(e) => {
                setTStart(e.target.value);
              }}
            />
          </div>
          <div className="flex-col w-2/5">
            <label className="block font-body text-blue-800 text-sm">Final</label>
            <Input
              required
              type="time"
              name="tFinal"
              value={tFinal}
              handleChange={(e) => setTfinal(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="block font-body text-blue-800 text-sm">
            Categoría
          </label>
          <Select
            required
            className=" rounded font-body text-gray-400 bg-gray-50 w-full focus:outline-none focus:ring-2 focus:ring-transparent"
            value={category}
            options={options}
            name="category"
            onChange={selectCategory}
            placeholder="Categoría"
          />
        </div>
        <label className="block font-body text-blue-800 text-sm">
          Elige un color
          <div className="flex justify-center space-x-1 mt-2">
            {colors.map((bground, index) => (
              <label key={index}>
                <input
                  required
                  className="absolute  w-8 h-8 focus:ring-1 focus:ring-blue-200"
                  type="radio"
                  value={bground}
                  name="color"
                  onChange={(e) => setColor(e.target.value)}
                  checked={color === `${bground}`}
                />
                <div
                  style={{ backgroundColor: `${bground}` }}
                  className="w-8 h-8 rounded-full cursor-pointer transform transition duration-500 hover:scale-90"
                ></div>
              </label>
            ))}
          </div>
        </label>

        <div className="flex space-x-2">
          <Button type="submit" text="Agendar" color="btn-y" />
          <div className="w-full">

          <Link to="/calendario" >
            <Button text="Calendario" color="btn-b" variant="secondary"/>
          </Link>
          </div>
        </div>
      </form>
      <div className="relative">
        <img
          className="w-1/2 mt-8"
          src="/assets/perroComponent.png"
          alt="perro"
        />
        <Toaster
          containerStyle={{ position: "absolute", top: "70px", left: "280px" }}
          toastOptions={{
            className:
              "whitespace-nowrap font-body shadow-2xl border-2 border-blue-200 rounded-2xl text-blue-800 p-12",
            style: {
             
              background: "#018DCB",
              color: 'white'
            },
          }}
        />
      </div>
    </div>
  );
}
