import React, {useState} from "react";
import Player from '../../../../componentes/Player';
import Perro from '../../../../componentes/Perro';
import Button from '../../../../componentes/Button';

function Banner({ isLost, initGame }) {
    //check current text if show multiple
    const [currentText, setCurrentText] = useState(0);

    //if lost this text will be display
    const lostText = "Perdiste, reintentalo.";

    //default texts
    const texts = [
        "Ahora realizaremos un ejercicio de concentración, que te ayudara a fortalecer tu atención sostenida."
    ];
    const textList = isLost ? [lostText, ...texts] : texts;

    const _nextText = () => {
        currentText +1 >= textList.length ? initGame() : setCurrentText(currentText + 1);
    }
    return <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#3D3F4150' }}>
        <div className="position-relative w-full h-full">
            <Perro arrow="left" bottom="8" left="15" text={textList[currentText]} />
            <Player bottom="5" left="5" />
            <Button right="5" bottom="5" onClick={_nextText} text="Continuar" />
        </div>
    </div>
}

export default Banner;