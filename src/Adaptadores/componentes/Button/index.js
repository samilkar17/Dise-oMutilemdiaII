import React from "react";
import Item from "../Item";
import "./index.css";
export default function Button({
  onClick,
  text,
  top,
  left,
  right,
  bottom,
  variant,
  type,
}) {
  return (
    <Item {...{ top, left, right, bottom }}>
      <button className={`button ${variant}`} type={type}>
        <img
          src={`/assets/backgrounds/bg-button-${variant ?? "primary"}.svg`}
        />
        <p onClick={onClick}>{text}</p>
      </button>
    </Item>
  );
}
