import React from 'react'
import { useSelector } from 'react-redux'
import { selectgender } from '../../../Puertos/feactures/gender/genderSlices'
import Item from '../Item'
import './index.css'
export default function Player({ top, left, right, bottom }) {
    const setGender = useSelector(selectgender)
    return <Item {...{top, left, right, bottom}}>
    <img src={`/assets/characteres/${setGender}_Perfil.svg`} className="imagePlayer" />
</Item>
}
