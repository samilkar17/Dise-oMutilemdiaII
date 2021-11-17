import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectActivity, selectUserData } from "../../../Puertos/feactures/activity/activitySlice";
import { selectUser } from "../../../Puertos/feactures/user/userSlice";
import { necesaryPoints } from "../../utills/LevelUtils";
import "./index.css";

export default function Hud() {
  const userData = useSelector(selectUserData);
  const activities = useSelector(selectActivity);
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
                      index < activities.length ? "active" : ""
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
                <div className="boxProgress" style={{width: `${userData.points*100/necesaryPoints(userData.level)}%`}}></div>
                <div>{userData.level}</div>
              </div>
            </div>
          </div>
        </div>
        {/* end daily progress*/}
      </div>
    </div>
  );
}
