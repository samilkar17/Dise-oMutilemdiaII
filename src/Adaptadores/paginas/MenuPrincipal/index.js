import React, { useState } from "react";
import Hud from "../../componentes/Hud";
import MenuButton from "../../componentes/MenuButton";
import Button from "../../componentes/Button";
import Perro from "../../componentes/Perro";
import Player from "../../componentes/Player";

const texts = [
  "He escaneado tu habitación y como puedes ver; los hologramas te indicarán que objetos puedes usar",
  "Cada cierto tiempo los objetos se iluminarán desplegando nuevas misiones para cumplir.",
  "Consejos: ¡Lograrás encontrar un cuaderno abierto brindándote  información de ayuda para llevar a cabo tus tareas de manera exitosa!",
  "Avatar: Selecciona un personaje que mas te guste para lograr las misiones",
  "Planificador: planea tus actividades futuras para lograr visualizar más fácilmente como cumples tus objetivos diarios!",
  "Respiración: ¡Lograrás técnicas de meditación y relajación en el cual se estimule la contemplación kinestésica y auditiva para mejorar la atención de tus actividades!",
  "Logros:! Una vez realizadas tus actividades podrás visualizar tu progreso y mirar tu eficiencia en el uso del sistema!",
  "Puzzle: diviértete  superando retos y desarrolla tu concentración y atención",
];

function MenuPrincipal() {
  const [phase, setPhase] = useState(0);
  const nextHandler = () => {
    setPhase(phase + 1);
  };
  return (
    <div
      className="w-full text-white"
      style={{
        backgroundImage: `url('/assets/backgrounds/cuartoOrdenado.svg')`,
      }}
    >
      <Hud />
      <MenuButton
        left={12}
        top={10}
        text="Consejos"
        icon="/assets/icons/consejos.svg"
        outstanding={phase == 2}
        newUrl={phase == 2 ? null : "/consejos"}
      />

      <MenuButton
        left={58.3}
        top={4.8}
        text="Avatar"
        icon="/assets/icons/avatar.svg"
        color="#71FFFF"
        outstanding={phase == 3}
        newUrl={phase == 3 ? null : "/avatar"}
      />
      <MenuButton
        left={34}
        top={13}
        text="Planificador"
        icon="/assets/icons/planificador.svg"
        color="#9C9C9C"
        outstanding={phase == 4}
        newUrl={phase == 4 ? null : "/planificador"}
      />
      <MenuButton
        left={70}
        top={45}
        text="Respiración"
        icon="/assets/icons/respiracion.svg"
        outstanding={phase == 5}
        newUrl={phase == 5 ? null : "/respiracion"}
      />
      <MenuButton
        left={68.5}
        top={5.2}
        text="Logros"
        icon="/assets/icons/logros.svg"
        outstanding={phase == 6}
        newUrl={phase == 6 ? null : "/logros"}
      />
      <MenuButton
        left={32}
        top={38}
        text="Puzzle"
        icon="/assets/icons/pluzzle.svg"
        color="#9C9C9C"
        outstanding={phase == 7}
        newUrl={phase == 7 ? null : "/pluzzle"}
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
      {phase < texts.length && (
        <Button right={5} bottom={5} text="Continuar" onClick={nextHandler} />
      )}
    </div>
  );
}

export default MenuPrincipal;
