import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Boton from "../../../src/Components/Button";
import Input from "../../../src/Components/Input";
import { auth } from "../../../src/firebase/config";
import {
  resetPassword,
  resetAllAuthForms,
} from "../../redux/User/user.actions";

export default function ReiniciarPass() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  u;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };
  return (
    <div className="flex flex-col justify-center items-center my-auto space-y-2 bg-blue-400 w-screen h-screen">
      {errors.length > 0 && (
        <ul>
          {errors.map((e, index) => {
            return (
              <li className="text-red-600 font-body" key={index}>
                {e}
              </li>
            );
          })}
        </ul>
      )}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl p-8 bg-blue-200 space-y-2"
      >
        <h1 className="font-body text-blue-800">Digitar correo electrónico!</h1>
        <Input
          type="email"
          value={email}
          placeholder="Email"
          handleChange={(e) => setEmail(e.target.value)}
        />

        <Boton type="submit" titulo="Enviar email" color="btn-y" />
      </form>
    </div>
  );
}

