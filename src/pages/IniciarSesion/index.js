import React, { useState,useEffect } from "react";
import {useHistory,Link} from 'react-router-dom'
import { auth,signIn } from "../../firebase/utils";
import {useAuthState} from 'react-firebase-hooks/auth'
import Boton from "../../Components/Button";
import Input from "../../Components/Input";



function IniciarSesion() {
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,loading,error] = useAuthState(auth)
  
  useEffect(() => {
   if(user) history.replace("/principal")
  }, [user,loading])

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetForm()
    signIn(email,password)
  };
  return (
    <div className="flex justify-center items-center bg-blue-400 w-screen h-screen">
      <div className="flex justify-center items-center w-3/4">
        <div className="">
          <img src="/assets/perro.png" alt="" />
          <h1 className="text-white font-body text-3xl w-1/2">
            Organizar tu presente y juntos construiremos un futuro brillante.
          </h1>
        </div>
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="bg-blue-300 p-16 rounded-2xl space-y-4 w-2/3"
            >
            <h1 className="text-blue-800 font-body text-4xl mb-2">
              Iniciar Sesión
            </h1>
            <label className="text-white font-body">E-mail</label>
            <Input
              placeholder="example@gmail.com"
              type="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              />
            <label className="text-white font-body">Contraseña</label>
            <Input
              placeholder="6+ Caracteres,1 letra en mayuscula"
              type="password"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              />
            <Boton type="submit" titulo="Iniciar Sesion" />
          </form>
          <h1 className=" mt-4 font-body text-white">
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

export default IniciarSesion