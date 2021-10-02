import React from "react";
import { useHistory } from "react-router";
import Button from "../../componentes/Button";

export default function Logro() {
  let text =
    "Ya estamos preparados para iniciar nuestro día, pero no olvides organizar tu espacio y así podrás tener tu mente y tus ideas claras para afrontar la jornada.";
  const history = useHistory();
  return (
    <div
      className="app "
      style={{ backgroundImage: `url('/assets/backgrounds/logro.png')` }}
    >
        
      <h1 className="relative my-20 z-10 -bottom-3/4 left-1/4 text-white text-center font-body text-2xl w-1/2">
        {text}
      </h1>
      <div
        className="absolute flex justify-center w-full my-8"
        style={{ bottom: "0vh", left: 0 }}
      >
        <Button
          text="Siguiente"
          onClick={() => history.push("/ordenarcuarto")}
        />
      </div>
    </div>
  );
}
