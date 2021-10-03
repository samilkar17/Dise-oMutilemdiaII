import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectgender } from "../../../Puertos/feactures/gender/genderSlices";
import { selectUser } from "../../../Puertos/feactures/user/userSlice";

export default function InfoUsuario() {
  const user = useSelector(selectUser);
  const setGender = useSelector(selectgender);

  return (
    <>
      <div className="flex flex-col  items-center space-y-8">
        <h1 className="text-blue-800 font-body text-xl text-center">
          Información sobre el Usuario
        </h1>
        <div className="flex ">
          <div className="flex flex-col my-4 mx-auto p-2">
            <h1 className="text-blue-800 text-center font-body p-2 capitalize">
              {user.displayName}
            </h1>
            <img className="bg-opacity-50 bg-white w-44 h-full p-4 rounded-2xl shadow-xl " src={`assets/characteres/${setGender}_Perfil.svg`} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
