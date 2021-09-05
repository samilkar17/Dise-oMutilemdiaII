import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signUp } from "../../firebase/utils";
import Boton from "../../Components/Button";
import Input from "../../Components/Input";

function Registrar() {
  const history = useHistory();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
   if(loading)return
   if(user)history.replace("/principal")
  }, [user,loading])
  const reset = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setPassword("");
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(!nombre || !apellido) alert("porfavor completar todos los campos")
    signUp(nombre, apellido, email, password);
    reset();
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
          <div className=" flex flex-col justify-center items-center ml-auto bg-blue-400 h-screen w-2/4 shadow ">
            <h1 className="font-body text-white text-3xl">Empecemos,</h1>
            <p className="font-body text-white">
              Crea tu cuenta para empezar esta aventura.
            </p>
            <form
              onSubmit={handleFormSubmit}
              className="bg-blue-300 rounded-2xl p-16 mt-4"
            >
              <div className="flex-col space-y-2">
                <div className="flex space-x-2 ">
                  <div className="space-y-2">
                    <label className="block font-body text-blue-900">
                      Nombre
                    </label>
                    <Input
                      placeholder="Pedro"
                      type="text"
                      value={nombre}
                      handleChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-body text-blue-900">
                      Apellido
                    </label>
                    <Input
                      placeholder="Navaja"
                      type="text"
                      value={apellido}
                      handleChange={(e) => setApellido(e.target.value)}
                    />
                  </div>
                </div>
                <label className="block font-body text-blue-900">E-mail</label>
                <Input
                  placeholder="example.com"
                  type="email"
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <label className="block font-body text-blue-900">
                  Contraseña
                </label>
                <Input
                  placeholder="6+ Caracteres,1 letra en mayuscula"
                  type="password"
                  value={password}
                  handleChange={(e) => setPassword(e.target.value)}
                />
                <Boton type="submit" titulo="Registrar" />
              </div>
            </form>
            <h1 className=" mt-4 font-body text-white">
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
