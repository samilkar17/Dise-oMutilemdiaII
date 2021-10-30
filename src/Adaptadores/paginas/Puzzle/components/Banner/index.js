import React from "react";
import Player from '../../../../componentes/Player';
import Perro from '../../../../componentes/Perro';
function Banner({children}) {
    return <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#3D3F4150' }}>
        <div className="position-relative w-full h-full">
            <Perro arrow="left" bottom="8" left="15" text="Ahora realizaremos un ejercicio de 
concentración, que te ayudara a fortalecer 
tu atención sostenida."/>
            <Player bottom="5" left="5" />
            {children}
        </div>
    </div>
}

export default Banner;