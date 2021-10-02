import React from 'react'
import Item from '../Item'
import './index.css'
export default function Player({ top, left, right, bottom }) {
    return <Item {...{top, left, right, bottom}}>
    <img src="/assets/characteres/player-1.svg" className="imagePlayer" />
</Item>
}
