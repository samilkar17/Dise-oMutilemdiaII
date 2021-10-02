import React from "react";
import Dialog from "../Dialog";
import Item from "../Item";

export default function Perro({
  top,
  left,
  right,
  bottom,
  inverse,
  text,
  arrow,
  className,
}) {
  return (
    <Item {...{ top, left, right, bottom }}>
      <div className={`${className} flex-nowrap items-center`}>
        <div>{text && <Dialog text={text} arrow={arrow} />}</div>
        <img
          src="/assets/characteres/Perro.svg"
          style={{ transform: inverse ? "scaleX(-1)" : "", height: "11vw" }}
        />
      </div>
    </Item>
  );
}
