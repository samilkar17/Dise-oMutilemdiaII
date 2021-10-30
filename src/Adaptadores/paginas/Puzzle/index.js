import React, { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Button from '../../componentes/Button';
import './index.css';
import Item from "../../componentes/Item";
import { useHistory } from "react-router";

function Puzzle() {
    let dragginItem = null;
    const history = useHistory();
    const [searchImages, setSearchImages] = useState([
        {
            id: 'light',
            displayName: 'Lámpara',
            found: false,
            searching: true,
            url: '/assets/pluzzle/lampara.svg',
            position: { left: 10, top: 10 },
            sizes: {height: '3em', width: '3em'}
        },
        {
            id: 'compass',
            displayName: 'Brújula',
            found: false,
            searching: true,
            url: '/assets/pluzzle/brujula.svg',
            position: { left: 20, top: 10 },
            sizes: {height: '3em', width: '3em'}
        },
        {
            id: 'map',
            displayName: 'Mapa',
            found: false,
            searching: true,
            url: '/assets/pluzzle/mapa.svg',
            position: { left: 30, top: 10 },
            sizes: {height: '3em', width: '3em'}
        },
        {
            id: 'bag',
            displayName: 'Morral',
            found: false,
            searching: true,
            url: '/assets/pluzzle/mochila.svg',
            position: { left: 40, top: 10 },
            sizes: {height: '3em', width: '3em'}
        },
        {
            id: 'cauldron',
            displayName: 'Caldero',
            found: false,
            searching: false,
            url: '/assets/pluzzle/caldero.svg',
            position: { left: 10, top: 40 },
            sizes: {height: '3em', width: '3em'}
        },
        {
            id: 'guitar',
            displayName: 'Guitarra',
            found: false,
            searching: false,
            url: '/assets/pluzzle/guitarra.svg',
            position: { left: 40, top: 20 },
            sizes: {height: '3em', width: '3em'}
        },
        {
            id: 'fire',
            displayName: 'Leña',
            found: false,
            searching: false,
            url: '/assets/pluzzle/lena.svg',
            position: { left: 40, top: 30 },
            sizes: {height: '3em', width: '3em'}
        },
        {
            id: 'chair',
            displayName: 'Silla',
            found: false,
            searching: false,
            url: '/assets/pluzzle/silla.svg',
            position: { left: 30, top: 30 },
            sizes: {height: '3em', width: '3em'}
        },
        {
            id: 'thermos',
            displayName: 'Termo',
            found: false,
            searching: false,
            url: '/assets/pluzzle/termo.svg',
            position: { left: 20, top: 30 },
            sizes: {height: '3em', width: '3em'}
        },
    ]);
    //mostrar banner
    const [visibleBanner, setVisibleBanner] = useState(false);
    const _initGame = () => {
        //hideBanner
        setVisibleBanner(false);
    }

    //draggable events
    const _endGame = () => {
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
            if (!copy.some((image)=>!image.found && image.searching)){
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

    return <div className="app" style={{ backgroundImage: 'url(/assets/backgrounds/logro.png)' }}>
        {searchImages.filter((image)=>!image.found).map((image) =>
            <Item left={image.position.left} right={image.position.right} bottom={image.position.bottom} top={image.position.top}>
                <img draggable="true" style={image.sizes} onDrag={(e) => _onDrag(e, image)} src={image.url} />
            </Item>
        )}


        {visibleBanner ? <Banner>
            <Button right="5" bottom="5" onClick={_initGame} text="Continuar" />
        </Banner> : <Item bottom="5" left="0" right="0">
            <div className="flex justify-center w-full">
                {searchImages.filter((image)=>image.searching).map((image) => <div onDrop={(e) => _onDrop(e, image)} onDragOver={_onDragover}
                    className={`imageSearch mx-2 p-2 ${image.found ? 'found' : ''}`} key={image.id}>{image.displayName}</div>)}
            </div>
        </Item>}

    </div>
}

export default Puzzle;