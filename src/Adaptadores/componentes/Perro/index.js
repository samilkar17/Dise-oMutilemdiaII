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
      <div className={`${className} ${arrow == 'left' || arrow == 'right' ? 'flex':''} ${arrow == 'left' ? 'flex-row-reverse':''} flex-nowrap items-center`}>
        <div style={{marginLeft: arrow == 'bottom' ? '-50%':''}}>{text && <Dialog text={text} arrow={arrow} />}</div>
        <img
          src="/assets/characteres/Perro.svg"
          style={{ transform: inverse || arrow =='left' ? "scaleX(-1)" : "", height: "11vw" }}
        />
      </div>
    </Item>
  );
}
