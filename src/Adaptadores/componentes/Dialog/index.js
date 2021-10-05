import React from "react";
import "./index.css";
export default function Dialog({ arrow, text }) {
  arrow = arrow ?? "right";
  return <div className={`dialog ${arrow}`}>
      <p>
          {text}
      </p>
  </div>
}