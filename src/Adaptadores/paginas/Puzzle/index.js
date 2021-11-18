import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Button from '../../componentes/Button';
import './index.css';
import Item from "../../componentes/Item";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { completeActivity } from "../../../Puertos/feactures/activity/activitySlice";

const searchImagesDefault = [
    {
        id: 'light',
        displayName: 'Lámpara',
        found: false,
        url: '/assets/puzzle/lampara.png',
        position: { left: 79, top: 34 },
        sizes: { width: '3.5vw' }
    },
    {
        id: 'compass',
        displayName: 'Brújula',
        found: false,
        url: '/assets/puzzle/brujula.png',
        position: { left: 17, top: 40 },
        sizes: { width: '3vw' }
    },
    {
        id: 'map',
        displayName: 'Mapa',
        found: false,
        url: '/assets/puzzle/mapa.png',
        position: { left: 86, top: 44 },
        sizes: { width: '6vw' }
    },
    {
        id: 'bag',
        displayName: 'Morral',
        found: false,
        url: '/assets/puzzle/mochila.png',
        position: { left: 6, top: 32 },
        sizes: { width: '8vw' }
    },
    {
        id: 'cauldron',
        displayName: 'Caldero',
        found: false,
        url:'/assets/puzzle/caldero.png',
        position: { left: 53.5, top: 27 },
        sizes: { width: '15vw' }
    },
    {
        id: 'guitar',
        displayName: 'Guitarra',
        found: false,
        url: '/assets/puzzle/guitarra.png',
        position: { left: 70, top: 31 },
        sizes: { width: '10vw' }
    },
    {
        id: 'fire',
        displayName: 'Leña',
        found: false,
        url: '/assets/puzzle/leña.png',
        position: { left: 25, top: 34 },
        sizes: { width: '9vw' }
    },
    {
        id: 'chair',
        displayName: 'Silla',
        found: false,
        url: '/assets/puzzle/silla.png',
        position: { left: 37, top: 29.5 },
        sizes: { width: '16vw' }
    },
    {
        id: 'thermos',
        displayName: 'Termo',
        found: false,
        url: '/assets/puzzle/termo.png',
        position: { left: 33, top: 42 },
        sizes: { width: '4vw' }
    },
];
const maxTimeSeconds = 60;
function Puzzle() {
    const dispatch = useDispatch();
    let dragginItem = null;
    const history = useHistory();
    const [remainingSeconds, setremainingSeconds] = useState(maxTimeSeconds);
    const [isPlaying, setisPlaying] = useState(false);
    const [hasLost, sethasLost] = useState(false)
    const [searchImages, setSearchImages] = useState(JSON.parse(JSON.stringify(searchImagesDefault)));
    //mostrar banner
    const [visibleBanner, setVisibleBanner] = useState(true);
    const _initGame = () => {
        setremainingSeconds(maxTimeSeconds);
        setSearchImages(JSON.parse(JSON.stringify(searchImagesDefault)));
        setisPlaying(true);
        //hideBanner
        setVisibleBanner(false);
    }

    //draggable events
    const _endGame = () => {
        dispatch(completeActivity('puzzle', null));
        history.push('/logro');
    }
    const _onDrop = (e, image) => {
        e.preventDefault();
        if (image == dragginItem) {
            //change state to found = true
            let copy = [...searchImages];
            image.found = true;
            setSearchImages(copy);
            //check if end game
            if (!copy.some((image) => !image.found)) {
                _endGame();
            }

        } else {
            console.log('err');
            dragginItem = null;
        }
    }
    const _onDrag = (e, image) => {
        e.preventDefault();
        dragginItem = image;
    }

    const _onDragover = (e) => {
        e.preventDefault();
    }

    //listener for call next step
    useEffect(() => {
        if (isPlaying && remainingSeconds > 0) {
            const timer = setTimeout(() => setremainingSeconds(remainingSeconds -1), 1000);
            return () => clearTimeout(timer);
        }else if(isPlaying){
            //lost
            setisPlaying(false);
            sethasLost(true);
            setVisibleBanner(true);
        }
    }, [isPlaying, remainingSeconds]);


    return <div className="app " style={{ backgroundImage: 'url(/assets/backgrounds/puzzle.png)' }}>
        <Item top="5" left="0" right="0" className="w-1/5 mx-auto rounded-md text-white font-body m-4 p-6 text-xl bg-blue-500 flex justify-center  items-center">
            <div className="timer btn text-center">
                {new Date(remainingSeconds * 1000).toISOString().substr(11, 8)}
            </div>
        </Item>
        {
            searchImages.filter((image) => !image.found).map((image) =>
                <Item left={image.position.left} right={image.position.right} bottom={image.position.bottom} top={image.position.top}>
                    <img draggable="true" style={image.sizes} onDrag={(e) => _onDrag(e, image)} src={image.url} />
                </Item>
            )
        }


        {
            visibleBanner ? <Banner initGame={_initGame} isLost={hasLost} />
                : <Item bottom="5" left="0" right="0">
                    <div className="flex justify-center w-full">
                        {searchImages.filter((image) => !image.found).slice(0, 5).map((image) => <div onDrop={(e) => _onDrop(e, image)} onDragOver={_onDragover}
                            className={`imageSearch mx-2 p-2 ${image.found ? 'found' : ''}`} key={image.id}>{image.displayName}</div>)}
                    </div>
                </Item>
        }

    </div >
}

export default Puzzle;