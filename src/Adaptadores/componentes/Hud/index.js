import React, { useState } from "react";
import "./index.css";

export default function Hud() {
  const [dailyProgress, setDailyProgress] = useState(4); // va del 1-5
  const [level, setLevel] = useState(10); //current level
  return (
    <div className="absolute" style={{ top: 16, left: 16 }}>
      <div className="flex">
        {/*  daily progress*/}
        <div className="hudBarContainer">
          <div className="w-full flex items-center ">
            <img src="/assets/icons/star.svg" />
            <div className="relative">
              <div className="w-full text-white text">Progreso diario</div>
              <div className="hudBar">
                {Array.from(Array(5).keys()).map((box, index) => (
                  <div
                    className={`boxProgress ${
                      index < dailyProgress ? "active" : ""
                    }`}
                    key={index}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* end daily progress*/}
        {/*  daily progress*/}
        <div className="hudBarContainer">
          <div className="w-full flex items-center ">
            <img src="/assets/icons/level.svg" style={{ padding: "2.5vh" }} />
            <div className="relative">
              <div className="w-full text-white text">Nivel</div>
              <div className="hudBar hudProgress">
                <div>{level}</div>
              </div>
            </div>
          </div>
        </div>
        {/* end daily progress*/}
      </div>
    </div>
  );
}
