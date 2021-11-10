import React from "react";
import "./index.css";

const categories = [
  {
    color: "#68F4EC",
    name: "Ciencias",
  },
  {
    color: "#5FD18C",
    name: "Ocio",
  },
  {
    color: "#FF8080",
    name: "Inglés",
  },
  {
    color: "#EF8BF8",
    name: "Matemáticas",
  },
  {
    color: "#A866F1",
    name: "Computactión",
  },
  {
    color: "#5665EC",
    name: "Meditación",
  },
];
//get day day of wee, getdate date of month
function CalendarComponent({ events, currentDate }) {
  const getHours = () => {
    let initialTime = new Date(1, 1, 1, 5, 0, 0, 0);
    const hours = [];
    for (let i = 0; i < 38; i++) {
      const copyDate = new Date(initialTime.getTime());
      hours.push(copyDate);
      initialTime.setMinutes(initialTime.getMinutes() + 30);
    }
    return hours;
  };
  const calcDays = () => {
    const date = currentDate.getDay();
    let firstDate = new Date();
    firstDate.setDate(currentDate.getDate() - date);
    let calendarDays = [
      { name: "DOM" },
      { name: "LUN" },
      { name: "MAR" },
      { name: "MIER" },
      { name: "JUE" },
      { name: "VIER" },
      { name: "SAB" },
    ];
    calendarDays = calendarDays.map((day) => {
      let dayTemp = { name: day.name, date: firstDate.getDate() };
      firstDate.setDate(firstDate.getDate() + 1);
      return dayTemp;
    });
    return calendarDays;
  };
  const calculatedDays = calcDays();

  const getDurationInMinutes = (event) => {
    const diffTime = Math.abs(event.tFinal - event.tStart);
    return Math.ceil(diffTime / (1000 * 60));
  };
  const getColor = (event) => {
    let filtred = categories.filter(
      (category) => category.name == event.category
    );
    return filtred.length > 0 ? filtred[0].color : "";
  };

  const getCurrentEvents = (hour, day) => {
    let filtred = events.filter(
      (event) =>
        event.tStart.getDate() == day.date &&
        event.tStart.getHours() == hour.getHours() &&
        event.tStart.getMinutes() == hour.getMinutes()
    );
    if (filtred.length > 0) {
      console.log(filtred);
      return (
        <div
          className="eventContainer absolute"
          style={{
            backgroundColor: getColor(filtred[0]),
            height: `${(1.2 / 30) * getDurationInMinutes(filtred[0])}em`,
          }}
        >
          <img
            className="calendarStar"
            src={`/assets/icons/star-2${filtred[0].completed ? "" : "-inactive"}.svg`}
          />
        </div>
      );
    } else return "";
  };

  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var strTime = hours + " " + ampm;
    return strTime;
  };
  return (
    <>
      <div className="h-full w-full flex justify-center items-center rounded-xl bg-blue-500 bg-opacity-50 p-2">
        {" "}
        <div className="flex flex-col hoursContainer">
          <div></div>
          {getHours().map((hour, index) => (
            <div key={index}>
              <p className="whitespace-nowrap">
                {index % 2 == 0 && index != 0 ? formatAMPM(hour) : ""}
              </p>
            </div>
          ))}
        </div>
        <table className="table-auto w-full calendarTable">
          <thead>
            <tr>
              {calculatedDays.map((day, index) => (
                <th key={index}>{day.name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="card">
            {getHours().map((hour, index) => (
              <tr key={index}>
                {calculatedDays.map((day, dayKey) => (
                  <td key={dayKey} className="relative">
                    {getCurrentEvents(hour, day)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CalendarComponent;
