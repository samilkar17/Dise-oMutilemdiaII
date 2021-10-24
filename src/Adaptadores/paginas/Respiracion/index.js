import React, { useState, useEffect } from "react";
import './index.css';
import { useHistory } from "react-router";
import Item from '../../componentes/Item';
import Player from '../../componentes/Player';
import Perro from '../../componentes/Perro';
import Button from '../../componentes/Button';

function Respiracion() {
    //limit of cycles (inhala and exhala), time of every breath
    const limitCycles = 6, timeBreath = 3;
    const history = useHistory();
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
        if (repetition +1 >= limitCycles * 2) history.push('/logro');
        else setRepetition(repetition + 1)
    }

    //reproduce inhala and exhala sound
    const _reproduceSound = () => {
        const sound = new Audio(`/assets/sounds/${repetition % 2 == 0 ? 'inhala' : 'exhala'}.mpeg`);
        sound.play();
    }

    //listener for call next step
    useEffect(() => {
        if (isPlaying) {
            _reproduceSound();
            const timer = setTimeout(() => _nextStep(), timeBreath * 1000);
            return () => clearTimeout(timer);
        }
    }, [isPlaying, repetition]);

    return <div className="app">
        <Item top="3" left="5" className='font-body  text-white text-3xl'>Respiracion</Item>
        <Item top="3" right="5" className='font-body  text-white text-3xl hover' onClick={_goBack}>X</Item>
        <Player bottom="5" left="3" />
        <Item left='30' top='9'>
            <div className='position-relative'>
                <img src='/assets/animates/inhala.svg' className='inhalaImageBg' />
                <div className='inhalaContainer'>
                    <h1>{repetition % 2 == 0 ? 'Inhala' : 'Exhala'}</h1>
                    <p>{isPlaying ? `${repetition + 1}/${limitCycles * 2}` : 'Oprime empezar para iniciar'}</p>
                </div>
            </div>
        </Item>
        <Perro right="3" bottom="10" text={isPlaying ? '' : "Hagamos juntos ejercicios de respiración que te ayudaran a mantener la mente clara."} arrow="bottom" />
        {!isPlaying &&
            <Button right="3" bottom="3" text="Empezar" onClick={_initGame} />
        }
    </div>
}

export default Respiracion;