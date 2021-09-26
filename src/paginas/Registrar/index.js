import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Register } from "../../feactures/user/userSlice";
import { useForm } from "react-hook-form";
import Boton from "../../componentes/Button";

function Registrar() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      Register({
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <>
      <div className="relative flex items-center justify-center ">
       
        <img
          className="h-screen w-screen h-screen bg-no-repeat bg-cover"
          src="./assets/login.png"
          alt=""
        />
        <div className="absolute flex bg-blue-800 w-screen h-full bg-opacity-50">
          <div className=" flex flex-col justify-center items-center ml-auto bg-blue-400 h-screen w-2/4 shadow space-y-4">
            <h1 className="z-10  font-body text-white text-3xl">Empecemos,</h1>
            <p className=" z-10 font-body text-white">
              Crea tu cuenta para empezar esta aventura.
            </p>
        
              <img
                className="absolute w-100 z-0"
                src="/assets/fondo-form.png"
                alt=""
              />

              <form onSubmit={handleSubmit(onSubmit)} className="relative">
                <div className="flex-col space-y-4">
                  <div className="flex space-x-2 ">
                    <div className="space-y-2">
                      <label className="block font-body text-white">
                        Nombre
                      </label>
                      <input
                        className="p-2  bg-gray-50 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-transparent"
                        placeholder="Pedro"
                        type="text"
                        {...register("name", {
                          required: {
                            value: 2,
                            message: "El nombre es requerido ⛔",
                          },
                          minLength: {
                            value: 3,
                            message: "Tu nombre es corto ⛔",
                          },
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm font-body">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="block font-body text-white">
                        Apellido
                      </label>
                      <input
                        className="p-2  bg-gray-50 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-transparent"
                        placeholder="Navaja"
                        type="text"
                        {...register("lastName", {
                          required: {
                            value: true,
                            message: "El apellido es obligatorio ⛔",
                          },
                          minLength: {
                            value: 2,
                            message: "Minimo 2 carácteres ⛔",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <p className="text-red-600 text-sm font-body">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <label className="block font-body text-white">
                    Correo electrónico
                  </label>
                  <input
                    className="p-2  bg-gray-50 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-transparent"
                    placeholder="ejemplo@gmail.com"
                    type="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "El correo es obligatorio ⛔",
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "El correo no es correcto",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm font-body">
                      {errors.email.message}
                    </p>
                  )}
                  <label className="block font-body text-white">
                    Contraseña
                  </label>
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
                  <Boton type="submit" titulo="Registrar" color="btn-y" />
                </div>
              </form>
       
            <h1 className="z-10 mt-4 font-body text-white">
              Si ya posees una cuenta,
              <Link
                to="/"
                className="text-yellow-400 border-b-2 border-yellow-400"
              >
                {" "}
                Inicia sesión
              </Link>{" "}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registrar;
