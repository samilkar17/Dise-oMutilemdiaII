import React, { useState } from "react";
import { useHistory } from "react-router";
import Button from "../../componentes/Button";
import Perro from "../../componentes/Perro";
import Player from "../../componentes/Player";
const texts = [
  "Antes de empezar a trabajar en tu futuro debes organizar tu presente.",
];
export default function OrdenarCuarto() {
  const history = useHistory();
  const [phase, setPhase] = useState(0);
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url('/assets/backgrounds/bg-cuarto-desordenado.svg')`,
      }}
    >
      <Button
        right={5}
        bottom={5}
        text="Siguiente"
        onClick={() => history.push("/cuartoOrdenado")}
      />
      <Player bottom={2} left={3} />
      {phase < texts.length && (
        <Perro
          arrow="right"
          className="flex "
          left={60}
          top={6}
          text={texts[phase]}
        />
      )}
    </div>
  );
}
