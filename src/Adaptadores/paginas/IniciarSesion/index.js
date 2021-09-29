import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../../Puertos/feactures/user/userSlice";
import Boton from "../../componentes/Button";

function IniciarSesion() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login({ email: data.email, password: data.password }));
  };
  return (
    <div className="flex justify-center items-center bg-blue-400 w-screen h-screen">
      <div className="flex justify-center items-center w-3/4">
        <div className="w-1/2">
          <img className="w-1/3" src="/assets/perro.png" alt="" />
          <h1 className="text-white font-body text-3xl w-2/3">
            Organizar tu presente y juntos construiremos un futuro brillante.
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="z-10 text-white font-body text-4xl mb-6">
            Iniciar Sesión
          </h1>
          <img
            className="absolute w-1/5 z-0"
            src="/assets/fondo-form.png"
            alt=""
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex flex-col space-y-6"
          >
            <div>
              <label className="text-white font-body">Correo electrónico</label>
              <input
                className="p-2  bg-gray-50 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-transparent"
                placeholder="example@gmail.com"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es obligatorio ⛔",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "El email no es correcto ⛔",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm font-body">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-white font-body">Contraseña</label>
              <input
                className="p-2  bg-gray-50 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-transparent"
                placeholder="6+ Caracteres,1 letra en mayuscula"
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria ⛔",
                  },
                  minLength: {
                    value: 6,
                    message: "Tu contraseña es débil ⛔",
                  },
                  maxLength: {
                    value: 10,
                    message: "Tu contraseña es mayor a 10 carácteres ⛔",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600 text-sm font-body">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Boton type="submit" titulo="Iniciar Sesion" color="btn-y" />
            {/* <Link to ="/reiniciarPass">
          <p className="font-body text-blue-800">¿Olvidaste tu contraseña?</p>
          </Link> */}
          </form>
          <h1 className="z-10 mt-4 font-body text-white">
            Si no posees una cuenta,
            <Link
              to="/registrar"
              className="text-yellow-400 border-b-2 border-yellow-400"
            >
              {" "}
              Registrate
            </Link>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;
