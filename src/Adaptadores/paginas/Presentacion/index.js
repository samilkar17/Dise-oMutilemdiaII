import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../componentes/Button";
import Player from "../../componentes/Player";
import Perro from "../../componentes/Perro";

const texts = [
  "Ahora que conoces mi historia, vamos a realizar tu primera actividad",
];

export default function Presentacion() {
  const history = useHistory();
  const [phase, setPhase] = useState(0);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url('/assets/backgrounds/bg-presentacion-habitacion.svg')`,
      }}
    >
      <Button
        right={5}
        bottom={5}
        text="Siguiente"
        onClick={() => history.push("/logro")}
      />
      <Player bottom={2} left={5} />
      {phase < texts.length && (
        <Perro
          arrow="right"
          className="flex "
          left={34}
          top={24}
          text={texts[phase]}
        />
      )}
    </div>
  );
}
