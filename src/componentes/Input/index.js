import React from 'react'

export default function Input({handleChange, ...otherProps}) {
    return (
        <>
           <input className="p-2  bg-gray-50 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-transparent" onChange={handleChange} {...otherProps} /> 
        </>
    )
}
