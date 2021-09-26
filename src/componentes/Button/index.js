import React from 'react'

export default function Boton({titulo,color, ...otherProps}) {
    return (
        <>
            <button className={`${color}`}
            {...otherProps}>{titulo} </button>
        </>
    )
}
