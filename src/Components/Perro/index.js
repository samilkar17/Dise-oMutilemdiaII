import React from 'react'

export default function Perro() {
    return (
        <div className="flex justify-center items-center space-x-8 ">
            <img className=" w-1/4 h-1/4" src="/assets/perroComponent.png" alt="" />
            <div className="bg-gradient-to-r from-blue-600  to-blue-800 w-2/5 rounded-lg border-4 border-blue-100">
                <h1 className="text-white text-center font-body p-6">Personaliza tu proyección virtual para empezar con la experiencia.</h1>
            </div>
        </div>
    )
}
