import React, { forwardRef } from "react";
import { TrashIcon, CheckIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Puertos/feactures/user/userSlice";
import { useDispatch } from "react-redux";
import {
  completedActivity,
  deleteActivity,
  completeActivitySuccess,
  removeActivitySuccess,
} from "../../../Puertos/feactures/activity/activitySlice";
import moment from "moment";
import 'moment/locale/es';
moment.locale("es");

const Actividad = forwardRef(
  ({ doc, title, category, color, completed, tFinal, tStart, }, ref) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
   
    return (
      <>
        <div
          ref={ref}
          className="relative h-20 bg-white rounded-2xl shadow-md  m-2 space-x-8"
        >
          <div
            className="absolute  
            h-20 w-6 rounded-l-2xl"
            style={{ backgroundColor: `${color}` }}
          ></div>
          <div className="flex justify-center items-center m-2 sm:m-0 p-1">
            <div className="flex-1 flex-col  leading-none space-y-2">
              <p className="font-light  text-sm text-gray-400">
                Categoria: {category}
              </p>
              <h1 className="font-semibold  text-blue-500 capitalize">
                {title}
              </h1>
            </div>
            <div className="flex flex-col mx-6 ml-auto">
              <p className="font-light text-sm text-gray-400 ">Duración</p>
              <p className=" font-semibold text-blue-500">
                {tStart.toDate().toLocaleString()}-{tFinal.toDate().toLocaleString()}
              </p>
            </div>
            <div className="flex items-end ml-auto space-x-1 p-2">
              <CheckIcon
                onClick={() =>
                  dispatch(
                    completeActivitySuccess(
                      completedActivity({ user, doc, completed })
                    )
                  )
                }
                className={
                  completed
                    ? `bg-green-400 w-7 h-7 text-white rounded-full cursor-pointer hover:bg-red-500`
                    : `w-7 h-7 cursor-pointer text-gray-400 rounded-full p-1.5 hover:text-white hover:bg-green-500 transition ease-in duration-200`
                }
              />
              <TrashIcon
                onClick={() =>
                  dispatch(removeActivitySuccess(deleteActivity({ user, doc })))
                }
                className="w-7 h-7 cursor-pointer text-gray-400 rounded-full hover:text-white p-1.5 hover:bg-red-500 transition ease-in duration-200"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
);
export default Actividad;
