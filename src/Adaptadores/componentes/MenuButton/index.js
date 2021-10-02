import React from "react";
import "./index.css";
import Item from "../Item";
import { Link } from 'react-router-dom';
export default function MenuButton({ top, left, right, bottom, text, color, icon, newUrl }) {
  return (
    <Item {...{ top, left, right, bottom }}>
      <Link
        className="text-white menuButton absolute"
        style={{
          backgroundColor: color ?? "#FFC671",
          boxShadow: `0px 0px 2vw 1vw ${color ?? "#FFC671"}`,
        }}
        to={newUrl}
      >
        <img src={icon} />
        <span className="capitalize">{text}</span>
      </Link>
    </Item>
  );
}
