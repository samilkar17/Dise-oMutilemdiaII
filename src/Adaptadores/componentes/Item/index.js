import React from "react";

export default function Item({
  top,
  left,
  right,
  bottom,
  height,
  width,
  children,
}) {
  return (
    <div
      className={!top && !left && !right && !bottom ? "relative" : "absolute"}
      style={{
        left: `${left}vw`,
        right: `${right}vw`,
        bottom: `${bottom}vw`,
        top: `${top}vw`,
        height: height,
        width: width,
      }}
    >
      {children}
    </div>
  );
}
