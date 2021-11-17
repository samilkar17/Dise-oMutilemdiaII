import React, { useState, useEffect } from "react";
import "./index.css";
import { useHistory } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Item from "../../componentes/Item";
import Player from "../../componentes/Player";
import Perro from "../../componentes/Perro";
import Button from "../../componentes/Button";
import { completeActivity, completedGameActivity } from "../../../Puertos/feactures/activity/activitySlice";
import { useDispatch } from "react-redux";

function Respiracion() {
  //limit of cycles (inhala and exhala), time of every breath
  const limitCycles = 6,
    timeBreath = 4;
  const history = useHistory();
  const dispatch = useDispatch();
  //counter for know current step
  const [repetition, setRepetition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const _goBack = () => history.goBack();
  //game init for init hexaling
  const _initGame = () => {
    setIsPlaying(true);
  };

  //every x time is call this function, for this reason it verify if has to change current page
  const _nextStep = () => {
    //if true call function of ended
    if (repetition + 1 >= limitCycles * 2) {
      dispatch(completeActivity('respiracion', null));
      history.push("/logro");
    }
    else setRepetition(repetition + 1);
  };

  //reproduce inhala and exhala sound
  const _reproduceSound = () => {
    const sound = new Audio(
      `/assets/sounds/${repetition % 2 == 0 ? "inhala" : "exhala"}.mpeg`
    );
    sound.play();
  };

  //listener for call next step
  useEffect(() => {
    if (isPlaying) {
      _reproduceSound();
      const timer = setTimeout(() => _nextStep(), timeBreath * 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, repetition]);

  return (
    <div className="app">
      <Item top="3" right="5" className="font-body  text-white text-3xl">
        Respiración
      </Item>
      <Item top="3" left="5" onClick={_goBack}>
        <ArrowLeftIcon className="w-12 h-12 cursor-pointer text-white rounded-full bg-red-500  p-1.5 hover:bg-red-700  transition ease-in duration-200" />
      </Item>
      <Player bottom="5" left="3" />
      <Item left="30" top="9">
        <div className="position-relative">
          <img src="/assets/animates/inhala.svg" className="inhalaImageBg" />
          <div className="inhalaContainer">
            <h1 className="text-white text-2xl font-body capitalize m-8">
              {repetition % 2 == 0 ? "Inhala" : "Exhala"}
            </h1>
            <p className="text-white text-xl font-body capitalize">
              {isPlaying
                ? `${repetition + 1}/${limitCycles * 2}`
                : "Oprime empezar para iniciar"}
            </p>
          </div>
        </div>
      </Item>
      <Perro
        right="3"
        bottom="10"
        text={
          isPlaying
            ? ""
            : "Hagamos juntos ejercicios de respiración que te ayudaran a mantener la mente clara."
        }
        arrow="bottom"
      />
      {!isPlaying && (
        <Button right="3" bottom="3" text="Empezar" onClick={_initGame} />
      )}
    </div>
  );
}

export default Respiracion;
