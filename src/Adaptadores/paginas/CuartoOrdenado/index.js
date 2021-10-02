import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../componentes/Button';

export default function CuartoOrdenado() {
    const history = useHistory();
    return <div className="app" style={{ backgroundImage: `url('/assets/backgrounds/cuartoOrdenado.svg')` }}>
        <Button right={5} bottom={5} text="Siguiente" onClick={() => history.push('/logro2')} />
     </div>
}