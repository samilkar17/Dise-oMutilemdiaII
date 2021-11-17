import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../componentes/Button';
import { selectUser } from '../../../Puertos/feactures/user/userSlice';
import { selectgender } from "../../../Puertos/feactures/gender/genderSlices";
import './index.css';
import { useSelector } from 'react-redux';

export default function Historia() {
    const setGender = useSelector(selectgender);
    const user = useSelector(selectUser);
    const history = useHistory();
    const [stage, setStage] = useState(0); //0 first text, 1 second text, 3 zoomed

    //check intro completed
    useEffect(() => {
        if (user.data.introCompleted) {
            history.push("/menu");
        }
    }, []);

    const changeStage = () => {
        if (stage == 1) history.push('/presentacion');
        else setStage(stage + 1);
    }
    return <div className="app introApp" style={{
        backgroundImage: `url('/assets/backgrounds/bg-historia-${setGender}-${stage}.png')`, backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }}>
        <Button right={5} bottom={5} text="Siguiente" onClick={changeStage} />
    </div>
}