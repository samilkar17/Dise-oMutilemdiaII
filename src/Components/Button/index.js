import React from 'react'

export default function Boton({titulo, ...otherProps}) {
    return (
        <>
            <button className="font-body text-yellow-600 bg-yellow-400 border-2 border-white rounded-2xl w-full  p-2 brightness-125 hover:text-white hover:bg-yellow-600 transition duration-150 ease-in-out"{...otherProps}>{titulo} </button>
        </>
    )
}
